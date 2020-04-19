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

function draw(e) {
    if(!isDrawing) return;      // stop the function when isDrawing is false

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);   // starting point of the line
    ctx.lineTo(e.offsetX, e.offsetY);   // end point of the line
    ctx.stroke();

    // update lastX, lastY
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    // reverse value-changing direction when lineWidth reaches certain number
    if (ctx.lineWidth > 100 || ctx.lineWidth < 10) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

// isDrawing depends on various mouse events
    // draw function is activated only when mousemove with mousedown
canvas.addEventListener('mousedown', e => {
    isDrawing = true;

    // make lines start at event's position
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('mousemove', draw);