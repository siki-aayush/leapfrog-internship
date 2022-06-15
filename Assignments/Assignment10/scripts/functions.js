// Updates the Contents of the Start and End Card modal
function updateModal() {
    const modalScore = document.querySelector(".modal__score");
    const modalHighScore = document.querySelector(".modal__highscore");
    modalScore.innerHTML = `Score: ${CURRENT_SCORE}`;
    modalHighScore.innerHTML = `HighScore: ${localStorage.getItem(
        "highScore"
    )}`;
}

// Changes lane on key pressed
function onKeyPressed(event) {
    if (event.key === "d" && CURRENT_LANE < 2) {
        user.updateX(lanePositions[++CURRENT_LANE]);
    } else if (event.key === "a" && CURRENT_LANE > 0) {
        user.updateX(lanePositions[--CURRENT_LANE]);
    }
}

//Checks whether there is collision between cars
function collisionDetect(user) {
    enemies.forEach((enemy) => {
        // Checks for rectangular collision
        if (
            enemy.x === user.x &&
            enemy.y + enemy.height >= user.y &&
            enemy.y <= user.y + user.height
        ) {
            // Stops the animation frame
            window.cancelAnimationFrame(animationId);


            // Removes the key event listener so that the card cannot move after game ends
            window.removeEventListener("keydown", onKeyPressed);

            // Checks and updates the high score
            if (localStorage.getItem("highScore") < CURRENT_SCORE) {
                modalHighscore.innerHTML = `HighScore: ${CURRENT_SCORE}`;
                localStorage.setItem("highScore", CURRENT_SCORE);
            }
            // Updates the modal contents and makes the model card visible
            updateModal();
            endCard.classList.remove("hide");
        }
    });
}

// Spawns Enemies in fixed interval of time
function spawnEnemies() {
    enemyIntervalId = setInterval(
        () =>
            enemies.push(
                new Car(
                    lanePositions[Math.floor(Math.random() * 3)],
                    -100,
                    CURRENT_SPEED,
                    enemyImage
                )
            ),
        ENEMY_SPWAN_RATE
    );
}

// Loops two lane to create an illusion of cars moving
function drawLane() {
    ctx.drawImage(laneImage, 0, LANE1_Y, 250, canvas.height);
    ctx.drawImage(laneImage, 250, LANE1_Y, 250, canvas.height);
    ctx.drawImage(laneImage, 500, LANE1_Y, 250, canvas.height);

    ctx.drawImage(laneImage, 0, LANE2_Y, 250, canvas.height);
    ctx.drawImage(laneImage, 250, LANE2_Y, 250, canvas.height);
    ctx.drawImage(laneImage, 500, LANE2_Y, 250, canvas.height);

    LANE1_Y >= canvas.height ? (LANE1_Y = 0) : (LANE1_Y += CURRENT_SPEED);
    LANE2_Y >= 0 ? (LANE2_Y = -canvas.height) : (LANE2_Y += CURRENT_SPEED);
}

function animate() {
    animationId = requestAnimationFrame(animate);

    // Draws the lane and user Car
    drawLane();
    user.draw();

    // Draws the enemy car and updates the position it's position
    enemies.forEach((enemy) => {
        enemy.updateY(CURRENT_SPEED);
    });

    // Removes the enemies that are goes outside of the canvs height
    enemies = enemies.filter((enemy) => {
        if (enemy.y < canvas.height) {
            return true;
        } else {
            // Increases the sore
            ++CURRENT_SCORE;


            // Updates the score on dom
            scoreCurrent.innerHTML = `Score ${CURRENT_SCORE}`;

            // Increases level after every increase in score by 3
            CURRENT_SCORE % 3 === 0 ? (CURRENT_SPEED += 2) : null;
            ENEMY_SPWAN_RATE -= 70;

            // Limits the rate of enemy spawn to 1000
            if (ENEMY_SPWAN_RATE > 1000) {
                clearInterval(enemyIntervalId);
                spawnEnemies();
            }

            return false;
        }
    });

    // Checks for collision
    collisionDetect(user);
}

//Resets all the variables and starts the game
function startGame() {
    // Resets all the global variables
    CURRENT_SPEED = 10;
    CURRENT_SCORE = 0;
    LANE1_Y = 0;
    LANE2_Y = -canvas.height;
    enemies = [];
    ENEMY_SPWAN_RATE = 2000;

    // Clears all the orphan intervals
    clearInterval(animationId);
    clearInterval(enemyIntervalId);

    // Updates score on dom
    scoreCurrent.innerHTML = `Score: ${CURRENT_SCORE}`;
    scoreHighscore.innerHTML = `HighScore: ${localStorage.getItem(
        "highScore"
    )}`;

    // Starts the game
    animate();
    spawnEnemies();

    // Adds event listener to move the player
    window.addEventListener("keydown", onKeyPressed);
}
