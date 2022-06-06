let gameState = 'start';
let stick_1 = document.querySelector('.stick_1');
let stick_2 = document.querySelector('.stick_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let stick_1_coord = stick_1.getBoundingClientRect();
let stick_2_coord = stick_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let stick_common =
  document.querySelector('.stick').getBoundingClientRect();
let score_1_data;
let score_2_data;

let dx = Math.floor(Math.random() * 2) ;
let dy = Math.floor(Math.random() * 2) ;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);
//Here, the necessary variables are defined and their connections are made with the html file using query.

document.addEventListener('keydown', (e) => {
  //In Here, using addEventListener, pressing the Enter key enables the pong game to start.
  if (e.key == 'Enter') {
    gameState = gameState == 'start' ? 'play' : 'start';
    if (gameState == 'play') {
      message.innerHTML = 'Game Started';
      message.style.left = 42 + 'vw';
      requestAnimationFrame(() => {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        dxd = Math.floor(Math.random() * 2);
        dyd = Math.floor(Math.random() * 2);
        moveBall(dx, dy, dxd, dyd);
      });
    }
  }
  //Here, the actions that the keys should perform for a 2-player game are defined. it can be summarized as the assignment of the keys of the game.
  if (gameState == 'play') {
    if (e.key == 'w') {
      stick_1.style.top =
        Math.max(
          board_coord.top,
          stick_1_coord.top - window.innerHeight * 0.15
        ) + 'px';
      stick_1_coord = stick_1.getBoundingClientRect();
    }
    if (e.key == 's') {
      stick_1.style.top =
        Math.min(
          board_coord.bottom - stick_common.height,
          stick_1_coord.top + window.innerHeight * 0.15
        ) + 'px';
      stick_1_coord = stick_1.getBoundingClientRect();
    }

    if (e.key == 'ArrowUp') {
      stick_2.style.top =
        Math.max(
          board_coord.top,
          stick_2_coord.top - window.innerHeight * 0.15
        ) + 'px';
      stick_2_coord = stick_2.getBoundingClientRect();
    }
    if (e.key == 'ArrowDown') {
      stick_2.style.top =
        Math.min(
          board_coord.bottom - stick_common.height,
          stick_2_coord.top + window.innerHeight * 0.15
        ) + 'px';
      stick_2_coord = stick_2.getBoundingClientRect();
    }
  }
});
//Here, the movements of the ball in the game are defined. Math library is actively used
function moveBall(dx, dy, dxd, dyd) {
  if (ball_coord.top <= board_coord.top) {
    dyd = 1;
  }
  if (ball_coord.bottom >= board_coord.bottom) {
    dyd = 0;
  }
  if (
    ball_coord.left <= stick_1_coord.right &&
    ball_coord.top >= stick_1_coord.top &&
    ball_coord.bottom <= stick_1_coord.bottom
  ) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.right >= stick_2_coord.left &&
    ball_coord.top >= stick_2_coord.top &&
    ball_coord.bottom <= stick_2_coord.bottom
  ) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  //The score is updated when the ball enters the right or left "goal". At the same time, the user who reaches 5 points wins the game.
  if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
  ) {
    if (ball_coord.left <= board_coord.left) {
      score_2.innerHTML = +score_2.innerHTML + 1;
      localStorage.setItem("score_2_data", score_2.innerHTML);
      if (score_2.innerHTML >= 5){
        score_2.innerHTML=0;
        score_1.innerHTML=0;

      }
    } else {
      score_1.innerHTML = +score_1.innerHTML + 1;
      localStorage.setItem("score_1_data", score_1.innerHTML);
      if (score_1.innerHTML >= 5){
          score_2.innerHTML=0;
          score_1.innerHTML = 0;

        }
    }
    gameState = 'start';


    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;
    message.innerHTML = 'Press Enter to Play Pong';
    message.style.left = 38 + 'vw';
    //The part that states that the player who reaches 5 points has won the game and that the game is over and what needs to be done to start the new game
    if(score_1.innerHTML==0 && score_2.innerHTML==0){
      message.innerHTML = 'Game Over Press Enter to Play';
      message.style.left=35 + 'vw';
      message.style.top= 18 +'vw';
    }
    return;
  }
  ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
  ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}
//I tried to save scores on local storage but I couldn't do it.
let savedScore = function() {
  localStorage.setItem("score_1", score_1.innerHTML);
  localStorage.setItem("score_2", score_2.innerHTML);

}
//It supposed to be load scores if game is closed unfinished
function loadSaveScores() {
  // get tasks items from local stroage
  let savedScore_1 = localStorage.getItem("score_1");
  let savedScore_2 = localStorage.getItem("score_2");

  savedScore_1  = JSON.parse(savedScore_1);
  savedScore_2 = JSON.parse(savedScore_2);

  document.getElementById("Scores").innerHTML = savedScore_1 + " - " + savedScore_1;

}


