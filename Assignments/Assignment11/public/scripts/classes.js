class Background {
    constructor() {
        this.spriteX = 146;
        this.spriteY = 0;
        this.spriteW = 144;
        this.spriteH = 256;
        this.x = 0;
        this.y = 0;
        this.w = canvas.width;
        this.h = canvas.height;
    }

    draw() {
        ctx.drawImage(
            sprite,
            this.spriteX,
            this.spriteY,
            this.spriteW,
            this.spriteH,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }
}

class Land {
    constructor() {
        this.spriteX = 292;
        this.spriteY = 0;
        this.spriteW = 168;
        this.spriteH = 56;
        this.x = 0;
        this.y = canvas.height - 140;
        this.w = canvas.width + canvas.width / 2;
        this.h = 140;
        this.dx = 3;
    }

    draw() {
        ctx.drawImage(
            sprite,
            this.spriteX,
            this.spriteY,
            this.spriteW,
            this.spriteH,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }

    update() {
        if (gameState.current === gameState.playing) {
            this.x = (this.x - this.dx) % (canvas.width / 2);
        }
    }
}

class Bird {
    constructor() {
        this.state = [
            { spriteX: 87, spriteY: 491 },
            { spriteX: 115, spriteY: 329 },
            { spriteX: 115, spriteY: 355 },
            { spriteX: 115, spriteY: 329 },
        ];
        this.spriteW = 17;
        this.spriteH = 12;
        this.x = 100;
        this.y = 280;
        this.w = 45;
        this.h = 35;
        this.frame = 1;
        this.speed = 0;
        this.gravity = 0.25;
        this.jump = 4;
        this.rotation = 0;
        this.radius = 20;
    }

    draw() {
        let birdPos = this.state[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            sprite,
            birdPos.spriteX,
            birdPos.spriteY,
            this.spriteW,
            this.spriteH,
            -this.w / 2,
            -this.h / 2,
            this.w,
            this.h
        );
        ctx.restore();
    }

    update() {
        // Spped of bird flapping
        this.period = gameState.current === gameState.ready ? 10 : 5;
        // Incremnt frame by 1 on each period
        this.frame += frames % this.period === 0 ? 1 : 0;
        // Reset the frame to 0 if frame > length of state
        this.frame = this.frame % this.state.length;

        if (gameState.current === gameState.ready) {
            this.y = 120;
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y + this.h / 2 >= canvas.height - land.h) {
                this.y = canvas.height - land.h - this.h / 2;
                if (gameState.current === gameState.playing) {
                    gameState.current = gameState.over;
                    dieSound.play();
                }
            }

            if (this.speed > this.jump) {
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            } else {
                this.rotation = -25 * DEGREE;
            }
        }
    }

    flap() {
        this.speed = -this.jump;
    }
}

class Pipe {
    constructor() {
        this.pipeList = [];
        this.topPipe = {
            spriteX: 56,
            spriteY: 323,
        };
        this.bottomPipe = {
            spriteX: 84,
            spriteY: 323,
        };

        this.spriteW = 26;
        this.spriteH = 160;
        this.w = 60;
        this.h = 600;
        this.gap = 100;
        this.dx = 2;
        this.boundaryTopY = -150;
    }

    draw() {
        for (let i = 0; i < this.pipeList.length; i++) {
            let pipe = this.pipeList[i];
            let topPos = pipe.y;
            let bottomPos = pipe.y + this.h + this.gap;
            let bottomH = canvas.height - bottomPos;

            ctx.drawImage(
                sprite,
                this.topPipe.spriteX,
                this.topPipe.spriteY,
                this.spriteW,
                this.spriteH,
                pipe.x,
                topPos,
                this.w,
                this.h
            );

            ctx.drawImage(
                sprite,
                this.bottomPipe.spriteX,
                this.bottomPipe.spriteY,
                this.spriteW,
                this.spriteH,
                pipe.x,
                bottomPos,
                this.w,
                bottomH
            );
        }
    }

    update() {
        if (gameState.current !== gameState.playing) return;
        if (frames % 150 === 0) {
            this.pipeList.push({
                x: canvas.width,
                y: this.boundaryTopY * (Math.random() + 1),
            });
        }

        this.pipeList.forEach((p) => {
            let bottomPos = p.y + this.h + this.gap;
            let bottomH = canvas.height - bottomPos;
            //collision detection with top pipe
            if (
                bird.x + bird.radius > p.x &&
                bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > p.y &&
                bird.y - bird.radius < p.y + this.h
            ) {
                gameState.current = gameState.over;
                hitSound.play();
            }
            if (
                bird.x + bird.radius > p.x &&
                bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > bottomPos &&
                bird.y - bird.radius < bottomPos + bottomH
            ) {
                gameState.current = gameState.over;
                hitSound.play();
            }
            p.x -= this.dx;
        });

        this.pipeList = this.pipeList.filter((p) => {
            if (p.x + this.w > 0) {
                return true;
            } else {
                score.current += 1;
                score.highscore = Math.max(score.current, score.highscore);
                localStorage.setItem("highscore", score.highscore);
                scoreSound.play();
                return false;
            }
        });
    }
}

class GetReadyMsg {
    constructor() {
        this.spriteX = 295;
        this.spriteY = 59;
        this.spriteW = 92;
        this.spriteH = 25;
        this.x = 100;
        this.y = 150;
        this.w = 300;
        this.h = 90;
    }

    draw() {
        if (gameState.current === gameState.ready) {
            ctx.drawImage(
                sprite,
                this.spriteX,
                this.spriteY,
                this.spriteW,
                this.spriteH,
                canvas.width / 2 - this.w / 2,
                canvas.height / 2 - 200,
                this.w,
                this.h
            );
        }
    }
}

class GetReadyBird {
    constructor() {
        this.spriteX = 292;
        this.spriteY = 91;
        this.spriteW = 57;
        this.spriteH = 49;
        this.x = 100;
        this.y = 150;
        this.w = 150;
        this.h = 125;
    }

    draw() {
        if (gameState.current === gameState.ready) {
            ctx.drawImage(
                sprite,
                this.spriteX,
                this.spriteY,
                this.spriteW,
                this.spriteH,
                canvas.width / 2 - this.w / 2,
                canvas.height / 2 - this.h / 2,
                this.w,
                this.h
            );

            ctx.font = "22px Sans";
            ctx.fillStyle = "#FFF";
            ctx.fillText(
                "Press Spacebar or Click ",
                canvas.width / 2 - 130,
                canvas.height / 2 + 100
            );
            ctx.fillText(
                "To start the game",
                canvas.width / 2 - 95,
                canvas.height / 2 + 130
            );
            //ctx.strokeText();
        }
    }
}

class GameOverMsg {
    constructor() {
        this.spriteX = 395;
        this.spriteY = 59;
        this.spriteW = 96;
        this.spriteH = 21;
        this.x = 100;
        this.y = 150;
        this.w = 300;
        this.h = 90;
    }

    draw() {
        if (gameState.current === gameState.over) {
            ctx.drawImage(
                sprite,
                this.spriteX,
                this.spriteY,
                this.spriteW,
                this.spriteH,
                canvas.width / 2 - this.w / 2,
                canvas.height / 2 - 200,
                this.w,
                this.h
            );
        }
    }
}

class GameOver {
    constructor() {
        this.spriteX = 3;
        this.spriteY = 259;
        this.spriteW = 113;
        this.spriteH = 57;
        this.x = 100;
        this.y = 150;
        this.w = 300;
        this.h = 150;
    }

    draw() {
        if (gameState.current === gameState.over) {
            ctx.drawImage(
                sprite,
                this.spriteX,
                this.spriteY,
                this.spriteW,
                this.spriteH,
                canvas.width / 2 - this.w / 2,
                canvas.height / 2 - this.h / 2,
                this.w,
                this.h
            );
        }
    }
}

class Score {
    constructor() {
        this.highscore = parseInt(localStorage.getItem("highscore")) || 0;
        this.current = 0;
    }

    draw() {
        ctx.fillStyle = "#FFF";
        if (gameState.current === gameState.playing) {
            ctx.lineWidth = 2;
            ctx.font = "45px Sans";
            ctx.fillText(this.current, canvas.width / 2, 50);
            ctx.strokeText(this.current, canvas.width / 2, 50);
        } else if (gameState.current === gameState.over) {
            ctx.font = "40px Sans";
            ctx.fillText(this.current, canvas.width / 2 + 80, 390);
            ctx.strokeText(this.current, canvas.width / 2 + 80, 390);

            ctx.fillText(this.highscore, canvas.width / 2 + 80, 450);
            ctx.strokeText(this.highscore, canvas.width / 2 + 80, 450);
        }
    }
}
