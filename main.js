// main.js

var mario = document.getElementById("mario");
var obstacles = [createObstacle(), createObstacle()];
var gameInterval;

function startGame() {
  mario.style.bottom = "0px";
  obstacles[0].style.right = "-50px";
  obstacles[1].style.right = "400px"; // Start second obstacle from middle
  gameInterval = setInterval(runGame, 20);
}

window.addEventListener("keydown", function (event) {
  if (event.key === " " && parseInt(mario.style.bottom) === 0) {
    jump();
  }
});

function runGame() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].style.right = `${parseInt(obstacles[i].style.right) + 5}px`;
    if (parseInt(obstacles[i].style.right) > 800) {
      obstacles[i].style.right = "-50px";
      changeObstacleImage(obstacles[i]); // change obstacle when the old one leaves the screen
    }
    if (collision(mario, obstacles[i])) {
      //   alert("Game Over!");
      clearInterval(gameInterval);
    }
  }
}

function jump() {
  let jumpInterval = setInterval(function () {
    if (parseInt(mario.style.bottom) < 100) {
      mario.style.bottom = `${parseInt(mario.style.bottom) + 5}px`;
    } else {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(function () {
        if (parseInt(mario.style.bottom) > 0) {
          mario.style.bottom = `${parseInt(mario.style.bottom) - 5}px`;
        } else {
          clearInterval(fallInterval);
        }
      }, 20);
    }
  }, 20);
}

function collision(div1, div2) {
  let rect1 = div1.getBoundingClientRect();
  let rect2 = div2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function changeObstacleImage(obstacle) {
  const obstaclesImages = ["./assets/pipe.png", "./assets/mushroom.png"]; // your obstacle images
  const randomIndex = Math.floor(Math.random() * obstaclesImages.length);
  if (obstaclesImages[randomIndex] == "pipe.png") {
    obstacle.style.bottom = "12px";
  } else {
    obstacle.style.height = "80px";
    obstacle.style.width = "80px";
    obstacle.style.bottom = "-8px";
  }
  obstacle.style.backgroundImage = `url(${obstaclesImages[randomIndex]})`;
}

function createObstacle() {
  let obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.style.right = "0";
  obstacle.style.width = "50px";
  obstacle.style.height = "50px";
  document.getElementById("gameArea").appendChild(obstacle);
  changeObstacleImage(obstacle); // Assign initial image to the obstacle
  return obstacle;
}
