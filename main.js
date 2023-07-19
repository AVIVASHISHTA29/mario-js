// main.js

var mario = document.getElementById("mario");
var gameArea = document.getElementById("gameArea");
var platforms = Array.from(document.getElementsByClassName("platform"));

// Set initial position
mario.style.left = "0px";
mario.style.bottom = "0px";

var marioSpeed = 15;
var gravity = 1;
var marioJumpSpeed = 15;
var marioJumping = false;

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      if (parseInt(mario.style.left) > marioSpeed)
        mario.style.left = parseInt(mario.style.left) - marioSpeed + "px";
      break;
    case "ArrowRight":
      if (
        parseInt(mario.style.left) + mario.offsetWidth + marioSpeed <
        gameArea.offsetWidth
      )
        mario.style.left = parseInt(mario.style.left) + marioSpeed + "px";
      break;
    case " ": // Space bar represents jump
      if (!marioJumping) {
        marioJumping = true;
        jump();
      }
      break;
  }
  collisionCheck();
});

function jump() {
  if (
    parseInt(mario.style.bottom) + marioJumpSpeed > 0 &&
    parseInt(mario.style.bottom) + marioJumpSpeed <
      gameArea.offsetHeight - mario.offsetHeight
  ) {
    mario.style.bottom = parseInt(mario.style.bottom) + marioJumpSpeed + "px";
    marioJumpSpeed -= gravity;
    setTimeout(jump, 20);
  } else {
    marioJumping = false;
    marioJumpSpeed = 10;
    mario.style.bottom = "0px";
  }
}

function collisionCheck() {
  platforms.forEach((platform) => {
    var marioX = parseInt(mario.style.left);
    var marioY = parseInt(mario.style.bottom);
    var marioWidth = mario.offsetWidth;
    var marioHeight = mario.offsetHeight;

    var platformX = parseInt(platform.style.left);
    var platformY = parseInt(platform.style.bottom);
    var platformWidth = platform.offsetWidth;
    var platformHeight = platform.offsetHeight;

    if (
      marioX < platformX + platformWidth &&
      marioX + marioWidth > platformX &&
      marioY < platformY + platformHeight &&
      marioHeight + marioY > platformY
    ) {
      mario.style.bottom = platformY + platformHeight + "px";
      marioJumping = false;
    }
  });
}
