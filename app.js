/**
|--------------------------------------------------
| =================================================
|--------------------------------------------------
*/
const canvasContainer = document.getElementById('canvasDiv');

const canvas = document.createElement('canvas');
canvas.setAttribute('width', 600);
canvas.setAttribute('height', 400);
canvas.setAttribute('id', 'canvas');

canvasContainer.appendChild(canvas);

if (typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
const context = canvas.getContext('2d');
/**
|--------------------------------------------------
| =================================================
|--------------------------------------------------
*/
let paint;
let clickX = [];
let clickY = [];
let clickDrag = [];

const addClick = (x, y, dragging) => {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
};

const redraw = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = '#02b3e4';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  for (let i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
};

$('#canvas').mousedown(function(e) {
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

$('#canvas').mousemove(function(e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e) {
  paint = false;
});

$('#canvas').mouseleave(function(e) {
  paint = false;
});

$('#clear-canvas-btn').click(function() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  paint = false;
  clickX = [];
  clickY = [];
  clickDrag = [];
});
