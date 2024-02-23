const hangmanImage = document.querySelector(".containerHangman img");
const wordDisplay = document.querySelector(".wordDisplay");
const guessesText = document.querySelector(".guessesText b");
const buttons = document.getElementsByTagName("button");
const gameModal = document.querySelector(".gameModal");
const playAgain = document.querySelector(".playAgain");
const keyboardDiv = document.querySelector(".keyboard");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const getRandomWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    resetGame();
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", e => initGame(e.target, buttons[i].innerHTML));
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `Encontraste la palabra` : `La palabra correcta era:`;
    gameModal.querySelector(".content img").src = `images/${isVictory ? "Juan" : "Luisa"}.jpg`;
    gameModal.querySelector(".content h4").innerText = `${isVictory ? '¡Felicitaciones!' : 'Perdiste :('}`;
    gameModal.querySelector(".content p").innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b>`;
    gameModal.classList.add("show");
}

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
    playAgain.disabled=false;
}

getRandomWord();
playAgain.addEventListener("click", getRandomWord);