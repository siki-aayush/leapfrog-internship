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
body.style.paddingTop = `${offset / 2}px`;

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
window.addEventListener("resize", () => {
    containerWidth = window.innerWidth - offset;
    containerHeight = window.innerHeight - offset;
    container.style.width = containerWidth + "px";
    container.style.height = containerHeight + "px";

    circles.forEach((circle) => {
        if (circle.y > containerHeight) {
            circle.y = containerHeight;
            circle.update(0.09);
        }
    });
});

// Generates random circles and draws them on the screen
const circles = getRandomCircles(200);
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
