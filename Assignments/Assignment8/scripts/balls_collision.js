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
    let squareDist = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
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
