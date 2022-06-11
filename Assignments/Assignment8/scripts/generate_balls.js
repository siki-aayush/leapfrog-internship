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
 * without two balls overlapping each other
 * num = Number
 */

function getRandomCircles(num) {
    let data = [];
    for (let i = 0; i < num; i++) {
        let radius = getRandomInt(10, 30);
        let x = getRandomInt(0, containerWidth - radius * 2);
        let y = getRandomInt(0, containerHeight - radius * 2);
        let dx = getRandomInt(-80, 80);
        let dy = getRandomInt(-80, 80);

        if (i !== 0) {
            for (let j = 0; j < data.length; j++) {
                let obj = data[j];
                if (
                    isCollision(
                        x + radius,
                        y + radius,
                        radius,
                        obj.x + obj.r,
                        obj.y + obj.r,
                        obj.r
                    )
                ) {
                    x = getRandomInt(0, containerWidth - radius * 2);
                    y = getRandomInt(0, containerHeight - radius * 2);
                    j = -1;
                }
            }
        }

        data.push(new Circle(x, y, dx, dy, radius));
    }

    return data;
}
