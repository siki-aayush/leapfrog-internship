class Carousel {
    constructor(id) {
        // Initializes all the variables
        this.id = id;
        this.dots = [];
        this.CURRENT_SLIDE = 0;
        this.intervalId = undefined;

        // Extract carousel and carousel wrapper
        this.carousel = document.querySelector(`#${id}`);
        this.wrapper = document.querySelector(`#${id} .carousel__wrapper`);

        // Extracts all the images element from carousal
        this.images = [...this.wrapper.children];
        this.MAX_SLIDES = this.images.length;

        // Creates Left right and pagination buttons
        this.prev = document.createElement("div");
        this.next = document.createElement("div");
        this.pagination = document.createElement("div");

        // Adds styling classes to buttons;
        this.prev.classList.add("btn");
        this.next.classList.add("btn");
        this.next.classList.add("btn--next");
        this.prev.classList.add("btn--prev");
        this.prev.innerHTML = "&#10094;";
        this.next.innerHTML = "&#10095;";
        this.pagination.classList.add("carousel__pagination");

        // Appends the created elements in carousel
        this.carousel.appendChild(this.prev);
        this.carousel.appendChild(this.next);
        this.carousel.appendChild(this.pagination);
    }

    // Automatic transition
    automate() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.CURRENT_SLIDE === this.MAX_SLIDES - 1
                ? this.swipe(this.CURRENT_SLIDE, 0, -0.05)
                : this.swipe(
                    this.CURRENT_SLIDE,
                    this.CURRENT_SLIDE + 1,
                    0.01
                );
        }, (Math.random() * 6 + 2) * 1000);
    }

    // Disables the buttons
    disableBtns() {
        this.next.style.pointerEvents = "none";
        this.prev.style.pointerEvents = "none";
    }

    // Enables the buttons
    enableBtns() {
        this.next.style.pointerEvents = "auto";
        this.prev.style.pointerEvents = "auto";
    }



    //Swipe slide
    swipe(prevIdx, nextIdx, increment) {
        this.disableBtns();

        this.dots[prevIdx].classList.remove("active");
        this.dots[nextIdx].classList.add("active");

        const id = setInterval(() => {
            prevIdx += increment;
            prevIdx = parseFloat(prevIdx.toFixed(2));

            //this.wrapper.style.left = -prevIdx * 600 + "px";
            this.wrapper.style.left = -prevIdx * 100 + "%";

            if (prevIdx === nextIdx) {
                this.enableBtns();
                this.CURRENT_SLIDE = nextIdx;
                clearInterval(id);
            }
        }, 5);


    }


    initializeEventListeners() {
        /**
         * Adds event listener on next button click
         * Swipes rigth on even fired
         */
        this.next.addEventListener("click", () => {
            if (this.CURRENT_SLIDE === this.MAX_SLIDES - 1) {
                //this.swipeRight(this.CURRENT_SLIDE, 0, -0.05);
                this.swipe(this.CURRENT_SLIDE, 0, -0.05);
            } else {
                //this.swipeRight(
                //    this.CURRENT_SLIDE,
                //    this.CURRENT_SLIDE + 1,
                //    0.01
                //);

                this.swipe(
                    this.CURRENT_SLIDE,
                    this.CURRENT_SLIDE + 1,
                    0.01
                );
            }
            this.automate();
        });

        /**
         * Adds event listener on prev button click
         * Swipes left of event fired
         */
        this.prev.addEventListener("click", () => {
            if (this.CURRENT_SLIDE === 0) return;
            //this.swipeLeft(this.CURRENT_SLIDE, this.CURRENT_SLIDE - 1, -0.01);
            this.swipe(this.CURRENT_SLIDE, this.CURRENT_SLIDE - 1, -0.01);
            this.automate();
        });

        /**
         * Stops the interval when the user leaves the browser tab
         */
        document.addEventListener("visibilitychange", () => {
            document.visibilityState === "visible"
                ? this.automate()
                : clearInterval(this.intervalId);
        });

        /**
         * Pagination Event listener
         */
        this.images.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.classList.add("carousel__pagination__dot");
            if (idx === 1)
                this.dots[this.CURRENT_SLIDE].classList.add("active");

            dot.addEventListener("click", () => {
                this.dots[this.CURRENT_SLIDE].classList.remove("active");
                this.CURRENT_SLIDE = idx;
                this.dots[this.CURRENT_SLIDE].classList.add("active");
                //this.wrapper.style.left = -this.CURRENT_SLIDE * 600 + "px";
                this.wrapper.style.left = -this.CURRENT_SLIDE * 100 + "%";
            });

            this.dots.push(dot);
            this.pagination.appendChild(dot);
        });
    }

    //Initializes all the event listeners
    init() {
        this.initializeEventListeners();
        this.automate();
    }
}

const first = new Carousel("carousel-1");
const second = new Carousel("carousel-2");
const third = new Carousel("carousel-3");
const fourth = new Carousel("carousel-4");

first.init();
second.init();
third.init();
fourth.init();
