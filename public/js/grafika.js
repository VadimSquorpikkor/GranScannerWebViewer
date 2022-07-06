
const TARGET = "target";
const COLOR_RED = 'red';
const LINE_WIDTH = 2;
const STEP = 4;
const HEIGHT = 200;

class gLine {

}

let c;
let ctx;

let linePeak;

let prevX;
let prevY;

function addLine(peak, i) {
  let x = i*STEP;
  let y = HEIGHT - peak*STEP;
  if (i!==0) drawLine(ctx, prevX, prevY, x, y, COLOR_RED, LINE_WIDTH);
  prevX = x;
  prevY = y;
}

function addLinesData(arr) {
  for (let i = 0; i < arr.length; i++) {
    let meas = arr[i];
    let peak = (meas.peak);
    addLine(peak, i);
  }
}

let arr = [10, 5, 8, 8, 4, 4, 4];

function addLinesData_(arr) {
  for (let i = 0; i < arr.length; i++) {
    let peak = arr[i];
    addLine(peak, i);
  }
}

function start() {
  c = document.getElementById(TARGET);
  ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = 200;

  // drawLine(ctx, 10, 10, 50, 50, COLOR_RED, LINE_WIDTH);
  addLinesData_(arr);
}

function drawLine(ctx, fromX, fromY, toX, toY, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

start();
