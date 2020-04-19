const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// size up canvas to the exact width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set initial values of Context
    // color and width of the line, shape of the where lines join and lines end
ctx.strokeStyle = "#BADA55";
ctx.lineWidth = 10;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// set initial values
    // drawing status tracker, last position, color, value-changing direction
let isDrawing = false;
let lastX = 0, lastY = 0;
let hue = 0;
let direction = true;