FPS = 50;
WIDTH = 1000;
HEIGHT = 750;
FACTOR = 0.25;

/*
 * Project a point from the pseudo 3d coordinate system
 * into the normal screen space
 */
var projection = (function() {
    function factor(z) {
        return Math.pow(2.0, -(z / 500.0));
    }
    
    function projectX(x, z) {
        return project(x, WIDTH, gfx.getWidth(), z);
    }
    
    function projectY(y, z) {
        return project(y, HEIGHT, gfx.getHeight(), z);
    }
    
    function unX(x, z) {
        return (x / gfx.getWidth()) * WIDTH;
    }
    
    function unY(y, z) {
        return (y / gfx.getHeight()) * HEIGHT;
    }
    
    function scaleX(x, z) {
        return (x / WIDTH) * gfx.getWidth();
    }

    function scaleY(y, z) {
        return (y / HEIGHT) * gfx.getHeight();
    }

    function project(val, total, projected, z) {
        var zoomed = projected * factor(z);
        var boxed = (projected / 2) - (zoomed / 2);
        return Math.floor(boxed + (val / total) * zoomed);
    }
    
    return {
        unX: unX,
        unY: unY,
        projectX: projectX,
        projectY: projectY,
        scaleX: scaleX,
        scaleY: scaleY
    };
}());

/*
 * Helper methods for graphic output in our space
 */
var gfx = (function() {
   
   var ctx, width, height;
   
   function clear() {
       ctx.fillStyle = '#000';
       ctx.fillRect(0, 0, width, height);               
   }
   
   function color(red, green, blue) {
       return "rgb(" + red + "," + green + "," + blue + ")";
   }
   
   function drawRectReal(x1, y1, x2, y2, color) {
       ctx.strokeStyle = color;
       ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
   }
   
   function drawLineReal(x1, y1, x2, y2, color) {
       ctx.strokeStyle = color;
       ctx.beginPath();
       ctx.moveTo(x1, y1);
       ctx.lineTo(x2, y2);
       ctx.stroke();
   }
   
   function drawSurfaceReal(image, x, y, width, height) {
       ctx.drawImage(image, x, y, width, height)
   }
   
   function drawRect(x1, y1, x2, y2, z, color) {
       drawRectReal(
           projection.projectX(x1, z),
           projection.projectY(y1, z),
           projection.projectX(x2, z),
           projection.projectY(y2, z),
           color
       );
   }
   
   function drawLine(x1, y1, z1, x2, y2, z2, color) {
       drawLineReal(
           projection.projectX(x1, z1),
           projection.projectY(y1, z1),
           projection.projectX(x2, z2),
           projection.projectY(y2, z2),
           color
       );
   }
   
   function drawSurface(image, x, y, width, height, z) {
       drawSurfaceReal(
           image,
           projection.projectX(x, z),
           projection.projectY(y, z),
           projection.scaleX(width, z),
           projection.scaleY(height, z)
       );
   }

   function init(id) {
       var canvas = $(id);
       ctx = canvas[0].getContext('2d');
       width = canvas.width();
       height = canvas.height();
   }
   
   function getWidth() {
       return width;
   }
   
   function getHeight() {
       return height;
   }
    
    return {
        clear: clear,
        color: color,
        drawRect: drawRect,
        drawLine: drawLine,
        drawSurface: drawSurface,
        getHeight: getHeight,
        init: init,
        getWidth: getWidth
    }
}());
