//init();

function init() {
  const enemies = document.getElementsByClassName("enemy");
  while (enemies.length > 0) {
    enemies[0].remove();
  }

  ng_sound = new Audio("http://soundfxcenter.com/television/the-simpsons/8d82b5_Homer_Simpson_Mmm_Beer_Sound_Effect.mp3");
  jump_sound = new Audio("http://soundfxcenter.com/television/the-simpsons/8d82b5_Homer_Simpson_Woohoo_Sound_Effect.mp3");
  ng_sound.load();
  jump_sound.load();

  score = 0;
  document.getElementById("score").textContent = score;

  document.getElementById("startBtn").style.display = "none";

  bgX = 0;

  maxX = window.innerWidth;

  document.addEventListener("click", fly);
  document.addEventListener("touchstart", fly);

  homer = document.getElementById("homer");
  maxY = window.innerHeight - homer.height;
  ay = 0.4;
  vy = 0;
  y = 0;
  homer.style.top = y + "px";

  start();
}

function start() {
  moveHomerInterval = setInterval(moveHomer, 20);
  genEnemyInterval = setInterval(genEnemy, 2000);
  moveEnemyInterval = setInterval(moveEnemy, 20);
  moveBackgroundInterval = setInterval(moveBackground, 20);
  countScoreInterval = setInterval(countScore, 100);
}

function end() {
  ng_sound.play();
  document.getElementById("startBtn").style.display = "block";
  clearInterval(moveHomerInterval);
  clearInterval(genEnemyInterval);
  clearInterval(moveEnemyInterval);
  clearInterval(moveBackgroundInterval);
  clearInterval(countScoreInterval);
}

function moveHomer() {
  vy += ay;
  y += vy;
  if (y < 0) {
    y = 0;
  } else if (y > maxY) {
    end();
  }
  checkCollision();
  homer.style.top = y + "px";
}

function genEnemy() {
  let pos = 20 + Math.random() * 60;
  let enemyTop = document.createElement("div");
  let enemyBottom = document.createElement("div");
  enemyTop.className = "enemy";
  enemyBottom.className = "enemy";
  enemyTop.style.bottom = pos + 10 + "%";
  enemyBottom.style.top = (100 - pos) + 27 + "%";
  enemyTop.style.left = maxX + "px";
  enemyBottom.style.left = maxX + "px";
  document.body.insertBefore(enemyTop, document.body.firstChild);
  document.body.insertBefore(enemyBottom, document.body.firstChild);
}

function moveEnemy() {
  const enemies = document.getElementsByClassName("enemy");
  for (let i = 0; i < enemies.length; i++) {
    let left = parseInt(enemies[i].style.left.replace(/px/, ""));
    left -= 10;
    if (left < -enemies[i].getBoundingClientRect().width) {
      enemies[i].remove();
    } else {
      enemies[i].style.left = left + "px";
    }
  }
}

function moveBackground() {
  bgX -= 10;
  document.body.style.backgroundPosition = bgX + "px";
}

function countScore(){
  score++;
  document.getElementById("score").textContent = score;
}

function checkCollision() {
  const enemies = document.getElementsByClassName("enemy");
  const homerRect = homer.getBoundingClientRect();
  for (let i = 0; i < enemies.length; i++) {
    let enemyRect = enemies[i].getBoundingClientRect();
    if (enemyRect.left < homerRect.right && homerRect.left < enemyRect.right) {
      if (enemyRect.top < homerRect.bottom && homerRect.top < enemyRect.bottom) {
        end();
      }
    }
  }
}

function fly() {
  jump_sound.play();
  vy = -10;
}
