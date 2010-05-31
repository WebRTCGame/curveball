var pad = (function() {
    
    var width = 200;
    var height = 160;
    
    var surface;
    var x,y;
    
    function init() {
        x = 500;
        y = 500;
        input.mousemove(update);
        surface = document.getElementById('pad');
    }
    
    function draw() {
        gfx.drawSurface(surface, x, y, width, height, 0);
    }
    
    function update(newx, newy) {
        x = Math.min(newx, WIDTH - width);
        y = Math.min(newy, HEIGHT - height);
        $('#debug').html("x: " + x + " y: " + y);
    }
    
    function isOnPad(ball) {
        return (x > ball.x - ball.width) &&
               (x < ball.x + ball.width) &&
               (y > ball.y - ball.height) &&
               (y < ball.y + ball.height);
    }
    
    return {
        init: init,
        draw: draw
    }
}());

