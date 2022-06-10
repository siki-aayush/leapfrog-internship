const container = document.createElement("div");
const body = document.getElementsByTagName("body")[0];
const offset = 50;

body.style.margin = "0";
body.style.padding = "0";
body.style.boxSizing = "border-box";
body.style.display = "flex";
body.style.height = "100%";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.paddingTop = `${offset / 2}px`


// Geeting the full width and height of device
let containerWidth = window.innerWidth - offset;
let containerHeight = window.innerHeight - offset;


// Container Styles
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";
container.style.position = "relative";
body.appendChild(container);


/*
 * When device screen is resized the container gets resized accordingly
 */
window.addEventListener('resize', () => {
    console.log("testing", window.innerWidth, window.innerHeight);
    containerWidth = window.innerWidth - offset;
    containerHeight = window.innerHeight - offset;
    container.style.width = containerWidth + "px";
    container.style.height = containerHeight + "px";

    circles.forEach(circle => {
        if (circle.y > containerHeight) {
            circle.y = containerHeight;
            circle.update(0.09)
        }

    })
})


/*
 * Checks wheter there is collision between two objects
 * Circl1
 * x1 = Number, x2 = Number, r1 = Number
 * Circle2
 * x2 = Number, y2 = Number, r2 = Number
 * returns
 * speed = Number, collisionDir = Object
 */
function isCollision(x1, y1, r1, x2, y2, r2) {
    let squareDist = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    let squareRadius = (r1 + r2) * (r1 + r2);
    return squareDist <= squareRadius;
}


/*
 * Calculates the Direction of collision and it's spped
 */
function changeDir(obj1, obj2) {
    // Calculates the collision vector
    let collisionVector = {
        x: obj2.x - obj1.x,
        y: obj2.y - obj1.y,
    };

    // Calculates the  Distance
    let distance = Math.sqrt(
        (obj2.x - obj1.x) * (obj2.x - obj1.x) +
        (obj2.y - obj1.y) * (obj2.y - obj1.y)
    );

    // Calculate the direction of Collision
    let collisionDir = {
        x: collisionVector.x / distance,
        y: collisionVector.y / distance,
    };

    // Calculates the relativeVelocity
    let relativeVelocity = {
        x: obj1.vx - obj2.vx,
        y: obj1.vy - obj2.vy,
    };

    // Calculates the speed
    let speed =
        relativeVelocity.x * collisionDir.x +
        relativeVelocity.y * collisionDir.y;

    return {speed, collisionDir};
}


function checkCircleCollision(circles) {
    // Resets Collision status
    for (let i = 0; i < circles.length; i++) {
        circles[i].isColliding = false;
    }

    // Checks wheter any two circles are collided
    for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (
                isCollision(
                    circles[i].x + circles[i].r,
                    circles[i].y + circles[i].r,
                    circles[i].r,
                    circles[j].x + circles[j].r,
                    circles[j].y + circles[j].r,
                    circles[j].r
                )
            ) {
                circles[i].isColliding = true;
                circles[j].isColliding = true;

                const {speed, collisionDir} = changeDir(
                    circles[i],
                    circles[j]
                );

                // If the speed is -ve the objects will automatically move away from
                // each other so no need to change speed
                if (speed < 0) {
                    break;
                }

                // Sets the resultant velocity of the objects after collision
                circles[i].vx -= speed * collisionDir.x;
                circles[i].vy -= speed * collisionDir.y;
                circles[j].vx += speed * collisionDir.x;
                circles[j].vy += speed * collisionDir.y;
            }
        }
    }
}

/*
 * Checks wheter the objects are collided with the boundary box
 * If collided then the ball is bounced back away from the wall
 */
function checkEdgeCollision(circles) {
    let obj;
    let restitution = 1; //Speed with which the ball is bounced back(Ball is bounced back in same speed here)
    for (let i = 0; i < circles.length; i++) {
        obj = circles[i];

        // Checks if the ball is collided in left or right boundary
        if (obj.x <= 0) {
            obj.vx = Math.abs(obj.vx * restitution);
        } else if (obj.x + obj.r * 2 > containerWidth) {
            obj.vx = -Math.abs(obj.vx * restitution);
        }

        // Checks if the ball is collided in top or bottom boundary
        if (obj.y < 0) {
            obj.vy = Math.abs(obj.vy * restitution);
        } else if (obj.y + obj.width > containerHeight) {
            obj.vy = -Math.abs(obj.vy * restitution);
        }
    }
}

class Circle {
    constructor(x, y, vx, vy, r = 15) {
        this.width = r * 2; //width of the circle
        this.height = r * 2; // height of the circle
        this.r = r; // radius
        this.x = x; // x-axis position
        this.y = y; // y-axis position
        this.vx = vx; // horizontal velocity
        this.vy = vy; //vertical velocity
        this.isColliding = false;

        // Creates a div element
        this.div = document.createElement("div");

        // Sets the random background color for circle
        this.div.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        // Adds the circle inside the box
        container.appendChild(this.div);
    }

    // Draws the circle inside the box
    draw() {
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.borderRadius = "50%"; this.div.style.position = "absolute";
        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";

    }

    // Updates the position of the circle
    update(time) {
        this.x += this.vx * time;
        this.y += this.vy * time;

        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";
    }
}



/*
 * Gets a random number between the specified Numbers
 * min = Number, max = Number
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


/*
 * Generates specified number of Circles with random data
 * num = Number
 */
function getRandomCircles(num) {
    let data = [];
    for (let i = 0; i < num; i++) {
        data.push(new Circle(
            getRandomInt(0, containerWidth),
            getRandomInt(0, containerHeight),
            getRandomInt(-80, 80),
            getRandomInt(-80, 80),
            getRandomInt(10, 30),
        ));
    }

    return data;
}


// Generates random circles
const circles = getRandomCircles(200);

// Draws the circles inside the box
circles.forEach((circle) => circle.draw());

/*
 * Checks for collision between Circles
 * Checks for collision of circles with boundary
 * Updates the velocity and position of the circles
 * Loops again
 */
function play() {
    checkCircleCollision(circles);
    checkEdgeCollision(circles);
    circles.forEach((circle) => circle.update(0.09));
    window.requestAnimationFrame(() => play());
}

play();
