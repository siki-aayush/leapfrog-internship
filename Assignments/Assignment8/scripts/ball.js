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

