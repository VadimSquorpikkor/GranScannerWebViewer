
const TARGET = "target";
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const COLOR_GRAY = '#999999';
const LINE_WIDTH = 2;
const STEP = 4;
const HEIGHT = 150;

class gLine {
  ctx;
  color;
  wide;

  prevX;
  prevY;
  height;
  constructor(ctx, color, wide) {
    this.ctx = ctx;
    this.color = color;
    this.wide = wide;
    this.stepX = STEP;
    this.height = HEIGHT;
  }
  stepX;
  stepY;
  maxY;
  minY;
  calculateStepY(arr) {
    for (let i = 0; i < arr.length; i++) {

      //if undefined. если нет значения, записываем. это для самого первого значения
      if (!this.maxY) this.maxY = arr[i];
      if (!this.minY) this.minY = arr[i];

      //максимум и минимум
      if (arr[i]>this.maxY) this.maxY = arr[i];
      if (arr[i]<this.minY) this.minY = arr[i];
    }

    //добавить 20% расстояние между краем поля и максимумом/минимумом графика
    this.minY = this.minY-(this.minY*0.2);
    this.maxY = this.maxY+(this.maxY*0.2);

    console.log('maxY='+this.maxY+' minY='+this.minY);
    console.log('height/(maxY - minY) ='+HEIGHT/(this.maxY - this.minY));
    this.stepY = HEIGHT/(this.maxY - this.minY);
  }

  setLineData(arr) {
    this.calculateStepY(arr);
    for (let i = 0; i < arr.length; i++) {
      this.addLineStep(arr[i], i);
    }
  }

  addLineStep(peak, i) {
    let x = i*this.stepX;
    let y = this.height - (peak-this.minY)*this.stepY;
    console.log('y=' + y);

    if (i!==0) this.drawLine(this.ctx, this.prevX, this.prevY, x, y, this.color, this.wide);
    this.prevX = x;
    this.prevY = y;
  }

  drawLine(ctx, fromX, fromY, toX, toY, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }

}

let peakLine;

function addGData(arr) {
  let ctx = document.getElementById(TARGET).getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = HEIGHT;

  peakLine = new gLine(ctx, COLOR_GRAY, LINE_WIDTH);
  peakLine.setLineData(arr);
}

