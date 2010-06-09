STATUS_SERVICE = 0;
STATUS_PLAY = 1;
STATUS_OUT = 2;

DIRECTION_TOBACK = 0;
DIRECTION_TOFRONT = 1;

BALLSIZE = 120;
SPEED = 300;

var Ball = GameObject.extend(function() {

    var surface;
    
    var x,y,z;
    var dx,dy,dz;
    var ax,ay,az;
    
    var width = BALLSIZE;
    var height = BALLSIZE;
    
    var status, direction;
    
    function init() {
        surface = document.getElementById('ball');
        resetPosition();
        
        input.mousedown(mousedown);
        events.subscribe('service', service);
    }
    
    function resetPosition() {
        x = 500 - width / 2;
        y = 375 - height / 2;
        z = 0;
        dx = 0; dy = 0; dz = 0;
        ax = 0; ay = 0; az = 0;
        status = STATUS_SERVICE;
        direction = DIRECTION_TOBACK;
    }
    
    function checkBounce(pad) {
        if (!pad.isInside(x, y)) {
            
        }
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
/*        if (z >= 1000) { 
            checkBounce()
        } */
        if (z >= 1000) {
            z = 2000 - z;
            dz = -dz;
        }
        
        if (z <= 0) {
            z = -z;
            dz = -dz;
        }
    }
    
    function mousedown() {
        if (status == STATUS_SERVICE && direction == DIRECTION_TOBACK) {
            events.fire('service');
        }
    }
    
    function service() {
        dz = SPEED;
    }
    
    function draw() {        
        // render ball
        gfx.drawSurface(surface, x, y, width, height, z);
        
        // render rectangle indicating z position of ball
        gfx.drawRect(0, 0, 1000, 750, z, gfx.color(93, 201, 198));
    }
    
    return {
        init: init,
        draw: draw,
        update: update
    }
}());
