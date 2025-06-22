const MIN_NUMBER = 1,
      MAX_NUMBER = 100;
let answer = parseInt((Math.random() * (MAX_NUMBER - MIN_NUMBER) + 1));
let highScore = localStorage.getItem('guessNumberRecord') || Infinity;
console.log(answer);
let attempts = 0;
const guessInput = document.getElementById("guess-input"),
      submitGuess = document.getElementById("submit-guess"),
      feedback = document.getElementById("feedback"),
      hint = document.getElementById("hint"),
      attemptsDisplay = document.getElementById("attempts"),
      newGame = document.getElementById("new-game");
      recordEl = document.getElementById('record')
      guessInput.disabled = true

if(highScore != Infinity) {
    recordEl.textContent = `Record: ${highScore}`;
}

console.log("Here am I");
guessInput.disabled = true;
console.log("Here am I 2");

newGame.addEventListener('click', function() {
    console.log(answer);
    guessInput.disabled = false;
    newGame.classList.toggle("hidden");
    submitGuess.classList.toggle("hidden");
    attempts = 0;
    attemptsDisplay.textContent = `Попытки: ${attempts}`;
    hint.style.color = '#f44336';
    submitGuess.addEventListener('click', checkGuess);
});
function checkGuess(){
    let userGuess = parseInt(guessInput.value);
    if(isNaN(userGuess) ||userGuess < MIN_NUMBER || userGuess > MAX_NUMBER){
        feedback.textContent = "Введите допустимое число!";
        hint.textContent = "";
        console.log(userGuess, answer);
        return;
    }
    attempts++;
    attemptsDisplay.textContent = `Попытки: ${attempts}`;
    if(userGuess === answer) {
        feedback.textContent = "Вы угадали число!";
        hint.textContent = "";
        hint.style.color = "#5cb85c";
        submitGuess.classList.toggle("hidden");
        newGame.classList.toggle("hidden")
        guessInput.disable = true;

        if(attempts < highScore) {
            highScore = attempts;
            localStorage.setItem(`guessNumberRecord`, highScore);
            recordEl.textContent = `Record: ${highScore}`;
        }
    }   else if (userGuess > answer) {
        feedback.textContent == "";
        hint.textContent = "Число меньше!";
    }   else{
        feedback.textContent ="";
        hint.textContent = "Число больше!";
    }
    guessInput.value = "";
}

