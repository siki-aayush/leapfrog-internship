// Class for cars
class Car {
    constructor(x, y, vy, carImage) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.width = 80;
        this.height = 160;
        this.carImage = carImage;
    }

    draw() {
        ctx.drawImage(this.carImage, this.x, this.y, this.width, this.height);
    }

    updateY(vy) {
        this.y += vy;
        this.draw();
    }

    updateX(x) {
        this.x = x;
        this.draw();
    }
}

const user = new Car(85, canvas.height - 200, 0, userImage);


// Get the high score from local storage if not found initialize the high score to zero
if (!localStorage.getItem("highScore")) localStorage.setItem("highScore", 0);
scoreHighscore.innerHTML = `High Score ${localStorage.getItem("highScore")}`;

// Restarts the game on Replay button clicked
replay.addEventListener("click", () => {
    endCard.classList.add("hide");
    startGame();
});

// Starts the game on start game button clicked
start.addEventListener("click", () => {
    startCard.classList.add("hide");
    startGame();
});


/**
 * Stops the interval when the user leaves the browser tab
 */
document.addEventListener("visibilitychange", () => {
    document.visibilityState === "visible"
        ? spawnEnemies()
        : clearInterval(enemyIntervalId);
});

