const hangmanImg = document.querySelector(".hangman img");
const lettersDiv = document.querySelector(".letters");
const wordDisplay = document.querySelector(".word");
const incorrectGuesses = document.querySelector(".incorrect-guesses b");
const gameModal = document.querySelector(".game-modal");
const PlayAgainBtn = document.querySelector(".play-again");

const guessesMax = 6;
let currentWord, correctletters, wrongGuessCount;

const resetGame = () => {
  correctletters = [];
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
        correctletters.push(letter);
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
  if (correctletters.length === currentWord.length) {
    return gameOver(true);
  }
};


for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  lettersDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
PlayAgainBtn.addEventListener("click", getRandomWord);
