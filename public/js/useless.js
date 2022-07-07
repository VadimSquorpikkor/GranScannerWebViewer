// let c;
// let ctx;
//
// let linePeak;
//
// let prevX;
// let prevY;
//
// function addLine(peak, i) {
//   let x = i*STEP;
//   let y = HEIGHT - peak*STEP;
//   if (i!==0) drawLine(ctx, prevX, prevY, x, y, COLOR_RED, LINE_WIDTH);
//   prevX = x;
//   prevY = y;
// }
//
// function addLinesData(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let meas = arr[i];
//     let peak = (meas.peak);
//     addLine(peak, i);
//   }
// }
//
// let arr = [10, 5, 8, 8, 4, 4, 4];
//
// function addLinesData_(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let peak = arr[i];
//     addLine(peak, i);
//   }
// }
//
// function start() {
//   c = document.getElementById(TARGET);
//   ctx = c.getContext("2d");
//   ctx.canvas.width  = window.innerWidth;
//   ctx.canvas.height = 200;
//
//   // drawLine(ctx, 10, 10, 50, 50, COLOR_RED, LINE_WIDTH);
//   addLinesData_(arr);
// }
//
// function drawLine(ctx, fromX, fromY, toX, toY, color, width) {
//   ctx.strokeStyle = color;
//   ctx.lineWidth = width;
//   ctx.beginPath();
//   ctx.moveTo(fromX, fromY);
//   ctx.lineTo(toX, toY);
//   ctx.stroke();
// }


// let stepX, stepY, maxY, minY;
// function calculateStepY(arr) {
//   for (let i = 0; i < arr.length; i++) {
//
//     //if undefined. если нет значения, записываем. это для самого первого значения
//     if (!maxY) maxY = arr[i];
//     if (!minY) minY = arr[i];
//
//     //максимум и минимум
//     if (arr[i]>maxY) maxY = arr[i];
//     if (arr[i]<minY) minY = arr[i];
//   }
//
//   //добавить 20% расстояние между краем поля и максимумом/минимумом графика
//   minY = minY-(minY*0.2);
//   maxY = maxY+(maxY*0.2);
//
//   console.log('maxY='+maxY+' minY='+minY);
//   console.log('height/(maxY - minY) ='+HEIGHT/(maxY - minY));
//   stepY = HEIGHT/(maxY - minY);
// }


//это для тестов
// function start() {
//
//   let arr =  [756, 458, 578, 345, 568];
//   // let arr2 = [549, 478, 675, 347, 677];
//   let arr2 = [456, 456, 456, 457, 457];
//
//   let ctx = document.getElementById(TARGET).getContext("2d");
//   ctx.canvas.width  = window.innerWidth;
//   ctx.canvas.height = HEIGHT;
//
//   // calculateStepY(arr);
//   // calculateStepY(arr2);
//
//   peakLine = new gLine(ctx, COLOR_RED, LINE_WIDTH);
//   peakLine.setLineData(arr);
//
//   peakLine2 = new gLine(ctx, COLOR_BLUE, LINE_WIDTH);
//   peakLine2.setLineData(arr2);
//
// }

// start();
