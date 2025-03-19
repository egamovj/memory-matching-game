const gameContainer = document.getElementById("game-container");
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
const emojis = ["🍎", "🍌", "🍇", "🍉", "🍋", "🍓", "🍍", "🥥"];

function initializeGame() {
  gameContainer.innerHTML = "";
  cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  firstCard = null;
  secondCard = null;
  lockBoard = true;

  cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = emoji;
    gameContainer.appendChild(card);
  });

  setTimeout(hideCards, 2000);
}

function hideCards() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.textContent = "?";
    card.addEventListener("click", flipCard);
  });
  lockBoard = false;
}

function flipCard(event) {
  if (lockBoard) return;
  const selectedCard = event.target;
  if (selectedCard.classList.contains("matched") || selectedCard === firstCard)
    return;

  selectedCard.classList.add("flipped");
  selectedCard.textContent = selectedCard.dataset.emoji;

  if (!firstCard) {
    firstCard = selectedCard;
  } else {
    secondCard = selectedCard;
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.textContent = "?";
      secondCard.textContent = "?";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 800);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

initializeGame();
