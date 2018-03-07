var canvas = null;
var ctx = null;

var canvasWidth = 0;
var canvasHeight = 0;
var row = 0;
var col = 0;
var size = 15;
var sizeExpand = 1;
var fps = 3;
var lastDrawTime = new Date();

var hoveredSquare = {};

var lastRowHover = row;
var lastColHover = col;

var init = function() {
  var wrapper = document.getElementById('mosaic');
  wrapper.addEventListener("mousemove", handleHover);

  canvasWidth = wrapper.clientWidth;
  canvasHeight = wrapper.clientHeight;
  row = Math.ceil(canvasWidth / size);
  col = Math.ceil(canvasHeight / size);

  console.log('canvasWidth', canvasWidth);
  console.log('canvasHeight', canvasHeight);
  console.log('row', row);
  console.log('col', col);

  canvas = document.createElement('canvas');


  canvas.id     = "mosaicCanvas";
  canvas.width  = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.zIndex   = 8;
  canvas.style.position = "absolute";
  canvas.style.border   = "none";
  wrapper.appendChild(canvas)
  ctx = canvas.getContext("2d");

  draw();
  //loop();
}

var loop = function() {
  window.requestAnimationFrame(function() {
    var now = new Date();
    var diffTime = now - lastDrawTime;

    if (diffTime > 1/fps * 1000) {
      lastDrawTime = new Date();
      draw();
    }
    loop();
  })
}

var draw = function() {
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  for (var y=0; col >= y; y++) {
    for (var x=0; row >= x; x++) {
      ctx.fillStyle = 'hsl(255, 70%, 50%)';
      ctx.fillRect(size*x,size*y,size,size);
    }
  }

}

var drawHover = function(nextX, nextY, delay) {
  setTimeout(function() {
      ctx.fillStyle = 'hsl(' + Math.random() * 255 +', 70%, 50%)';
      ctx.fillRect(nextX, nextY, size, size);
   }, delay);

   setTimeout(function() {
       ctx.fillStyle = 'hsl(255, 70%, 50%)';
       ctx.fillRect(nextX, nextY, size, size);
    }, 1000);


}

var handleHover = function(e) {
  var x = e.clientX;
  var y = e.clientY;

  var row = Math.floor(x/size);
  var col = Math.floor(y/size);

  if (lastRowHover !== row || lastColHover !== col) {
    lastRowHover = row;
    lastColHover = col;

    var totalExpandSize = (sizeExpand * 2) + 1;
    for (var hy=0; totalExpandSize > hy; hy++) {
      for (var hx=0; totalExpandSize > hx; hx++) {
        var nextX = (row*size) + ((hx-sizeExpand)*size);
        var nextY = (col*size) + ((hy-sizeExpand)*size);

        var delay = (Math.abs(hy - sizeExpand) + Math.abs(hx - sizeExpand)) * 50;
        console.log(delay);
        drawHover(nextX, nextY, delay);

      }
    }
  }
}



init();

window.addEventListener("resize", init);
