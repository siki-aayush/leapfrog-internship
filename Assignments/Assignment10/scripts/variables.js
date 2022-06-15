const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scoreCurrent = document.querySelector(".score__current");
const scoreHighscore = document.querySelector(".score__highscore");
const startCard = document.querySelector(".modal--start");
const endCard = document.querySelector(".modal--end");
const modalHighscore = document.querySelector(".modal--end .modal__highscore")
const start = document.querySelector(".modal--start .modal__btn");
const replay = document.querySelector(".modal--end .modal__btn");
const lanePositions = [85, 335, 585];

// Initializes canvas width
canvas.width = 750;
canvas.height = window.innerHeight;

// Inilial values
let CURRENT_LANE = 0;
let CURRENT_SPEED = 10;
let CURRENT_SCORE = 0;
let LANE1_Y = 0;
let LANE2_Y = -canvas.height;
let ENEMY_SPWAN_RATE = 2000;

let enemies = [];
let animationId;
let enemyIntervalId;

// Images
const laneImage = new Image();
const userImage = new Image();
const enemyImage = new Image();
laneImage.src = "./assets/lane.webp";
userImage.src = "./assets/car_blue.png";
enemyImage.src = "./assets/car_pink.png";
