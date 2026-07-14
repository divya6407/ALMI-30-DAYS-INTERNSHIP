import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTIONS = `You are the lead writer for "Explore the Unknown", a discovery platform that turns history,
mythology, unsolved mysteries, space, paranormal phenomena, and ancient civilizations into gripping,
story-driven articles — never dry encyclopedia entries.

Voice rules:
- Storytelling first: write like you're narrating a documentary, not summarizing a textbook.
- Curiosity-driven: every section should make the reader want to keep going.
- Plain English: simple enough for a curious teenager. No academic jargon, no long paragraphs.
- Clearly separate confirmed facts from popular theories and folklore. NEVER present speculation as fact.
- If no consensus exists among experts, say so plainly instead of inventing one.

You must respond with ONLY raw JSON (no markdown fences, no preamble) matching exactly this shape:
{
  "title": string,
  "category": string,
  "hook": string,               // 2-4 gripping sentences that open the story
  "summary": string,            // quick overview: what, where, when, why it's famous (short)
  "story": string,              // the full narrated story, chronological, several paragraphs separated by \\n\\n
  "keyFacts": string[],         // only verified, confirmed facts
  "theories": string[],         // each entry: "Theory name: short explanation of why people believe it"
  "historicalView": string,     // what historians/scientists currently believe; say clearly if experts are uncertain
  "mythsAndRumors": string[],   // folklore, urban legends, internet rumors - unverified, framed as such
  "mostAcceptedExplanation": string, // the consensus view, OR the literal sentence "There is currently no single explanation accepted by all experts." if none exists
  "funTrivia": string[],        // 3-5 short surprising trivia points
  "relatedTopics": string[],    // 4-6 similar topic names the reader could explore next
  "timeline": [{ "date": string, "event": string }],
    // A chronological list of key dates/events, ONLY if the topic genuinely has one
    // (history, mythology, ancient civilizations, disappearances, etc). Use short date
    // labels like "1912" or "c. 1500 BC". Return an empty array [] if the topic has no
    // real chronology (e.g. abstract science or psychology topics) — never invent dates.
  "pullQuote": string
    // ONE short, powerful, quotable sentence (under 20 words) that captures the emotional
    // core of the story - written by you, not copied from any source. This gets visually
    // highlighted mid-article, so make it striking.
}`;

/**
 * Generates one full structured article for a topic using Gemini.
 * Returns a parsed JS object matching the Article schema fields.
 */
export async function generateArticle(topic, category = "Unsolved Mysteries") {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    systemInstruction: SYSTEM_INSTRUCTIONS,
  });

  const prompt = `Write the full "Explore the Unknown" article for the topic: "${topic}".
Category to use unless the topic clearly belongs elsewhere: "${category}".
Respond with ONLY the JSON object described in your instructions, nothing else.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  const cleaned = raw
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `Gemini returned non-JSON content for topic "${topic}": ${err.message}`
    );
  }

  return parsed;
}
