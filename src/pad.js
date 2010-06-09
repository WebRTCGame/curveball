var Pad = GameObject.extend(function() {
    
    var width = 200;
    var height = 160;
    
    var surface;
    var x,y, z;
    
    function init(zpos, id) {
        x = 500;
        y = 500;
        z = zpos;
        
        surface = document.getElementById(id);
        
        events.subscribe('ballatend', ballAtEnd);
    }
    
    function draw() {
        gfx.drawSurface(surface, x, y, width, height, 0);
    }
    
    function updatePos(xpos, ypos) {
        x = xpos;
        y = ypos;
    }
    
    function isOnPad(ball) {
    }
    
    function ballAtEnd(bx, by, bz) {
        // check if it is on our side
        if (Math.abs(z - bz) > 1000) {
            return;
        }
        
        events.fire('bounce');
    }
    
    return {
        init: init,
        draw: draw,
        updatePos: updatePos
    }
}());

var PlayerPad = Pad.extend(function() {
    function init(zpos, surface) {
        this._super(zpos, surface);
        input.mousemove(this.updatePos);
    }

    function mousemove(newx, newy) {
        x = Math.min(newx, WIDTH - width);
        y = Math.min(newy, HEIGHT - height);
        $('#debug').html("x: " + x + " y: " + y);
    }
    
    return {
        init: init
    }
}());