const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    totalLives: 3,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    moveEnemy: setInterval(randomSquare, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.moveEnemy);
    alert("Game Over! Seu resultado foi: " + state.values.result);
  }
}
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  randomSquare.classList.add("enemy");

  state.values.hitPosition = randomSquare.id;
}

function playSound(audioGame) {
  let audio = new Audio(`./src/audios/${audioGame}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        state.values.totalLives--;
        state.view.lives.innerText = `x${state.values.totalLives}`;
        playSound("wrong");
        if (state.values.totalLives <= 0) {
          clearInterval(state.actions.countDownTimerId);
          clearInterval(state.actions.moveEnemy);
          setTimeout(() => {
            alert("Game Over! Seu resultado foi: " + state.values.result);
          }, 100);
        }
      }
    });
  });
}

function init() {
  addListenerHitBox();
}

init();
