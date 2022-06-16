// Canvas
//const canvas = document.getElementById("canvas");
//const ctx = canvas.getContext("2d");

// Variablesl
let frames = 0;
const gameState = {
    current: 0,
    ready: 0,
    playing: 1,
    over: 2,
};

const DEGREE = Math.PI / 180;

// Images
const sprite = new Image();
sprite.src = "./assets/icons/sprite_test.png";

const scoreSound = new Audio();
scoreSound.src = "./assets/audio/sfx_point.wav";

const flapSound = new Audio();
flapSound.src = "./assets/audio/sfx_flap.wav";

const hitSound = new Audio();
hitSound.src = "./assets/audio/sfx_hit.wav";

const swooshSound = new Audio();
swooshSound.src = "./assets/audio/sfx_swooshing.wav";

const dieSound = new Audio();
dieSound.src = "./assets/audio/sfx_die.wav";
