//init();
//start of the game initializer
function init() {
  //this grabs from my html
  const enemies = document.getElementsByClassName("enemy");
  //finding the length of enemies (div) and while thats less than 0 we want to
  // remove the first enemy so we can create a space for the character can go through
  while (enemies.length > 0) {
    enemies[0].remove();
  }
//these are the audio files they are global in scope
//the word new references the new object im creating
  ng_sound = new Audio("http://soundfxcenter.com/television/the-simpsons/8d82b5_Homer_Simpson_Mmm_Beer_Sound_Effect.mp3");
  jump_sound = new Audio("http://soundfxcenter.com/television/the-simpsons/8d82b5_Homer_Simpson_Woohoo_Sound_Effect.mp3");
  //this load fnctn load my sounds
  ng_sound.load();
  jump_sound.load();
//this my variable score
  score = 0;
  //reassigning score to update in my span
  document.getElementById("score").textContent = score;
//this removes the game over image to play
  document.getElementById("startBtn").style.display = "none";
  //This allows the background position to display a negative result
  //so that while the user plays the image can move towards the left versus being fixed
  bgX = 0;
  // This will return the width of the viewport
  //max X is the width of the window
  maxX = window.innerWidth;
  //Adding event lusteners for homer to fly
  document.addEventListener("click", fly);
  document.addEventListener("touchstart", fly);
  //assigning the variable homer to this image
  const homer = document.getElementById("homer");
  // i want the inner height of the window to subtract the height of homer
  maxY = window.innerHeight - homer.height;
  //javascript is loosely typed,
  // these variables look like they are in this functn but there SCOPE is
  //global because i never declared a variable name and assigned them values
  //these variables are gonna be where homer starts
  ay = 0.4;
  vy = 0;
  y = 0;
  //This is the position of homer at the start
  homer.style.top = y + "px";
  //Start game!
  start();
}
function start() {
  //set interval repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
  //It returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval()
  //These are all global also
  moveHomerInterval = setInterval(moveHomer, 20);
  genEnemyInterval = setInterval(genEnemy, 2000);
  moveEnemyInterval = setInterval(moveEnemy, 20);
  moveBackgroundInterval = setInterval(moveBackground, 20);
  countScoreInterval = setInterval(countScore, 100);
  //The time, in milliseconds (thousandths of a second), the timer should delay in between executions of the specified function or code.
}
//My end function will end the game
function end() {
  ng_sound.play();
  //My starting image will show up again signifying the game is done
  document.getElementById("startBtn").style.display = "block";
  //The clearInterval() method clears a timer set with the setInterval() method.
//The ID value returned by setInterval() is used as the parameter for the clearInterval()
  clearInterval(moveHomerInterval);
  clearInterval(genEnemyInterval);
  clearInterval(moveEnemyInterval);
  clearInterval(moveBackgroundInterval);
  clearInterval(countScoreInterval);
  //This basically resets all my intervals
}
//i declared vy as a fly function down below this fnctn
function moveHomer() {
  vy += ay;
  y += vy;
  if (y < 0) {
    y = 0;
  } else if (y > maxY) {
    end();
  //This fnctn is first saying (vy = vy + ay)
  //Then y = y + vy
  //if y is less than 0
} //check collison functn checks if homer has collided with an enemy (duff can)
  checkCollision();
  //this will reset the position back to the start
  homer.style.top = y + "px";
}
//
function genEnemy() {
  //this functn starts with randomizing the position of my enemy duff cans and also how wide the gap between them will be for homer to go through
  let pos = 20 + Math.random() * 60;
  //creating these divs creates the enemies (duff cans)
  let enemyTop = document.createElement("div");
  let enemyBottom = document.createElement("div");
  //this is just adding the class name enemy to the new divs enemyTop and enemy Bottom
  enemyTop.className = "enemy";
  enemyBottom.className = "enemy";
  //this is just adding 10% to the position of the bottom of the enemy top variable
  enemyTop.style.bottom = pos + 10 + "%";
  //100 - the random value of position + 27 then u add percentage and whatever value that is will be the top position of
  //my enemyBottom variable
  enemyBottom.style.top = (100 - pos) + 27 + "%";
  //this will grab my window inner width and add it to my variable enemy top left property
  enemyTop.style.left = maxX + "px";
  //this will grab my window inner width and add it to my variable enemy bottom left property
  enemyBottom.style.left = maxX + "px";
  //this is inserting my divs (enemy) before my image
  document.body.insertBefore(enemyTop, document.body.firstChild);
  //this is also inserting my divs (enemy) before my image
  document.body.insertBefore(enemyBottom, document.body.firstChild);
}

function moveEnemy() {
  const enemies = document.getElementsByClassName("enemy");
  // my count starts at 0 and if my count is less than the amount of my enemies (duff cans) add 1 to my count
  for (let i = 0; i < enemies.length; i++) {
    // my variable left will parse an integer out of whatever the count of the enemies left property is.
    //that was replaced with a string
    let left = parseInt(enemies[i].style.left.replace(/px/, ""));
    // left = left-10
    left -= 10;
    // method returning the size of an element and its position relative to the viewport. so in this case its returning the width
    // of the window (image) and saying if the variable left is less than the count of the enemies rectangles
    //getBoundingClientRect makes it easier to do a collide function
    if (left < -enemies[i].getBoundingClientRect().width) {
      //remove the rectangle (duffcan stacked)
      enemies[i].remove();
    } else {
      //keep moving to the left
      enemies[i].style.left = left + "px";
    }
  }
}
  //create the background function so it moves to the left
function moveBackground() {
  //within this function im resetting the background position (bgX) to be -10 to move to the left
  bgX -= 10;
  document.body.style.backgroundPosition = bgX + "px";
}

function countScore(){
  //add 1 to the score
  score++;
  document.getElementById("score").textContent = score;
}
//We need to figure out when homer runs into the duff can enemy
function checkCollision() {
  //declare two variables to check for the enemies and rectangle around the enemies
  const enemies = document.getElementsByClassName("enemy");
  const homerRect = homer.getBoundingClientRect();
  //to test if homer collides im creating a for loop stating when variable i = 0 and that count is less than the amt  of
  //enemies then add one to the count
  for (let i = 0; i < enemies.length; i++) {
    //inside this loop we have a variable enemyRect which we set equal to the duff bears rectangle
    let enemyRect = enemies[i].getBoundingClientRect();
    //now i have an if statement stating if the left property of my enemies (duff) rectangle is less than my homers right property rectangle
    //and if homers rectangles left property  is less than the duffs right property then run another if statement
    if (enemyRect.left < homerRect.right && homerRect.left < enemyRect.right) {
      //if the enemy (duff) rectangles top property is less than the bottom property of homerRect
      //and if the top property of homer is less than the enemy (duff) rectangles bottom property
      //end the game!
      if (enemyRect.top < homerRect.bottom && homerRect.top < enemyRect.bottom) {
        end();
      }
    }
  }
}
//i need a fly function
function fly() {
  jump_sound.play();
  //setting my vy variable to negative 10 will move homer to the right
  vy = -10;
}
