const bg = new Background();
const land = new Land();
const bird = new Bird();
const getReadyMsg = new GetReadyMsg();
const getReadyBird = new GetReadyBird();
const gameOver = new GameOver();
const gameOverMsg = new GameOverMsg();
const pipes = new Pipe();
const score = new Score();

document.addEventListener("click", () => {
    switch (gameState.current) {
        case gameState.ready:
            gameState.current = gameState.playing;
            swooshSound.play();
            break;

        case gameState.playing:
            if (bird.y - bird.radius <= 0) return;
            bird.flap();
            flapSound.play();
            break;

        case gameState.over:
            bird.speed = 0;
            pipes.pipeList = [];
            score.current = 0;
            gameState.current = gameState.ready;
            break;

        default:
            break;
    }
});

document.addEventListener("keyup", (e) => {
    switch (gameState.current) {
        case gameState.ready:
            if (e.key === " ") {
                gameState.current = gameState.playing;
                swooshSound.play();
            }
            break;

        case gameState.playing:
            if (e.key === " ") {
                if (bird.y - bird.radius <= 0) return;
                bird.flap();
                flapSound.play();
            }
            break;

        case gameState.over:
            if (e.key === " ") {
                bird.speed = 0;
                pipes.pipeList = [];
                score.current = 0;
                gameState.current = gameState.ready;
            }
            break;

        default:
            break;
    }
});

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bg.draw();
    pipes.draw();
    land.draw();
    bird.draw();
    getReadyBird.draw();
    getReadyMsg.draw();
    gameOverMsg.draw();
    gameOver.draw();
    score.draw();
}

function update() {
    bird.update();
    land.update();
    pipes.update();
}

function animate() {
    update();
    draw();
    frames++;
    requestAnimationFrame(animate);
}

animate();
