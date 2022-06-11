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
