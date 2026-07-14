let emoji = ['🚀','🧑‍🚀','👽','🪐','⭐','☄️','🛰️','🔭','🚀','🧑‍🚀','👽','🪐','⭐','☄️','🛰️','🔭'];
let cards = [];
let flippedCards = [];
let score = 0;
let moves = 0;
let time = 0;
let timerInterval = null;
let lockBoard = false;

const container = document.getElementById("container");
const scoreEl = document.getElementById('score');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const bestEl = document.getElementById('best');
const restartBtn = document.getElementById('restart');

// Shuffle the emoji array
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize cards
function initCards() {
  cards = shuffle([...emoji]).map((em, i) => ({
    id: i,
    value: em,
    flip: false,
    matched: false
  }));
}

// Timer functions
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = `Time: ${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Setup the DOM
function setup() {
  container.innerHTML = '';
  cards.forEach(card => {
    const btn = document.createElement('button');
    btn.className = `card-${card.id} space-cards`;
    btn.textContent = '❓';
    btn.addEventListener('click', () => flipped(card.id));
    container.appendChild(btn);
  });
  updateScoreBoard();
}

// Update score/moves/best
function updateScoreBoard() {
  scoreEl.textContent = `Score: ${score}`;
  movesEl.textContent = `Moves: ${moves}`;
  bestEl.textContent = `Best Score: ${localStorage.getItem('bestScore') || '-'}`;
}

// Restart game
function restart() {
  score = 0;
  moves = 0;
  time = 0;
  flippedCards = [];
  lockBoard = false;
  stopTimer();
  emoji = ['🚀','🧑‍🚀','👽','🪐','⭐','☄️','🛰️','🔭','🚀','🧑‍🚀','👽','🪐','⭐','☄️','🛰️','🔭'];
  initCards();
  setup();
}

// Flip card logic
function flipped(index) {
  if (lockBoard) return;

  const card = cards[index];
  const btn = document.querySelector(`.card-${card.id}`);
  if (card.matched || card.flip) return;

  // Start timer on first move
  if (!timerInterval && moves === 0 && flippedCards.length === 0) startTimer();

  card.flip = true;
  btn.textContent = card.value;
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    moves++;
    updateScoreBoard();

    const [first, second] = flippedCards;
    if (cards[first].value === cards[second].value) {
      // Matched
      cards[first].matched = cards[second].matched = true;
      document.querySelector(`.card-${first}`).textContent = "✅";
      document.querySelector(`.card-${second}`).textContent = "✅";
      score += 10;
      flippedCards = [];
      updateScoreBoard();
      checkWin();
    } else {
      // Not matched
      score -= 2;
      lockBoard = true;
      updateScoreBoard();
      setTimeout(() => {
        cards[first].flip = cards[second].flip = false;
        document.querySelector(`.card-${first}`).textContent = "❓";
        document.querySelector(`.card-${second}`).textContent = "❓";
        lockBoard = false;
        flippedCards = [];
      }, 800);
    }
  }
}

// Check win condition
function checkWin() {
  if (cards.every(c => c.matched)) {
    stopTimer();
    let best = localStorage.getItem('bestScore');
    if (!best || score > Number(best)) {
      localStorage.setItem('bestScore', score);
      bestEl.textContent = `Best Score: ${score}`;
    }
    setTimeout(() => alert(`🎉 YOU WIN! Final Score: ${score}, Time: ${time}s, Moves: ${moves}`), 300);
  }
}

// Event listeners
restartBtn.addEventListener('click', restart);

// Initialize game
initCards();
setup();
