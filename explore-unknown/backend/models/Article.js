import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },

    hook: { type: String, required: true },
    summary: { type: String, required: true },
    story: { type: String, required: true },
    keyFacts: { type: [String], default: [] },
    theories: { type: [String], default: [] },
    historicalView: { type: String, default: "" },
    mythsAndRumors: { type: [String], default: [] },
    mostAcceptedExplanation: { type: String, default: "" },
    funTrivia: { type: [String], default: [] },
    relatedTopics: { type: [String], default: [] },
    timeline: {
      type: [{ date: String, event: String }],
      default: [],
    },
    pullQuote: { type: String, default: "" },

    wikipediaImage: { type: String, default: "" },
    wikipediaImages: { type: [String], default: [] },
    wikipediaUrl: { type: String, default: "" },

    searchCount: { type: Number, default: 1 },

    generatedBy: { type: String, default: "gemini" },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
