STATUS_SERVICE = 0;
STATUS_PLAY = 1;
STATUS_OUT = 2;

DIRECTION_TOBACK = 0;
DIRECTION_TOFRONT = 1;

var ball = (function() {

    var surface;
    
    var x,y,z;
    var dx,dy,dz;
    var ax,ay,az;
    
    var status, direction;
    
    function init() {
        surface = document.getElementById('ball');
        resetPosition();
    }
    
    function resetPosition() {
        x = 500 - settings.ballsize / 2;
        y = 375 - settings.ballsize / 2;
        z = 0;
        dx = 0; dy = 0; dz = 0;
        ax = 0; ay = 0; az = 0;
        status = STATUS_SERVICE;
        direction = DIRECTION_TOBACK;
    }
    
    function update(time) {                
        // update positions according to speed
        x += dx * time;
        y += dy * time;
        z += dz * time;
        
        // update speed according to acceleration
        dx += ax * time;
        dy += ay * time;
        dz += az * time;
        
        // bounce
        if (z >= 1000) {
            z = 2000 - z;
            dz = -dz;
        }
        
        if (z <= 0) {
            z = -z;
            dz = -dz;
        }
    }
    
    function draw() {
        // render ball
        gfx.drawSurface(surface, x, y, settings.ballsize, settings.ballsize, z);
        
        // render rectangle indicating z position of ball
        gfx.drawRect(0, 0, 1000, 750, z, gfx.color(93, 201, 198));
    }
    
    return {
        init: init,
        draw: draw,
        update: update
    }
}());
