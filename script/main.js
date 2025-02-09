const hangmanImg = document.querySelector(".hangman img");
const lettersDiv = document.querySelector(".letters");
const wordDisplay = document.querySelector(".word");
const incorrectGuesses = document.querySelector(".incorrect-guesses b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const levelButtons = document.querySelectorAll(".level"); 
const levelModal = document.querySelector(".level-modal");

const guessesMax = 6;
let currentWord, correctLetters, wrongGuessCount, wordList;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;

  hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
  incorrectGuesses.innerText = `${wrongGuessCount} / ${guessesMax}`;
  lettersDiv
    .querySelectorAll("button")
    .forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");

  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word:`
      : `The correct word was :`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victoryFunny" : "lostFunny"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  incorrectGuesses.innerText = `${wrongGuessCount} / ${guessesMax}`;

  if (wrongGuessCount === guessesMax) {
    return gameOver(false);
  }
  if (correctLetters.length === currentWord.length) {
    return gameOver(true);
  }
};

levelButtons.forEach(button => {
  button.addEventListener("click", () => {
    const level = button.dataset.level;
    if (level === "easy") {
      wordList = easy;
    } else if (level === "medium") {
      wordList = medium;
    } else {
      wordList = hard;
    }

    levelModal.classList.add("hide"); // Hide the level selection modal
    getRandomWord(); // Start the game
  });
});

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  lettersDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

levelModal.classList.remove("hide");

playAgainBtn.addEventListener("click", () => {
  resetGame();
  gameModal.classList.remove("show"); // Hide the game over modal
  levelModal.classList.remove("hide"); // Show level selection again
});

