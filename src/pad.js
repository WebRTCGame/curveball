var Pad = GameObject.extend(function() {
    
    var width = 200;
    var height = 160;
    
    function init(zpos, id) {
        this.x = 500;
        this.y = 500;
        this.z = zpos;
        
        this.surface = document.getElementById(id);
        
        events.subscribe('ballatend', this, ballAtEnd);
    }
    
    function draw() {
        gfx.drawSurface(this.surface, this.x, this.y, width, height, this.z);
    }
    
    function updatePos(xpos, ypos) {
        this.x = xpos;
        this.y = ypos;
    }
    
    function isOnPad(ball) {
    }
    
    function ballAtEnd(bx, by, bz) {
        // check if it is on our side
        if (Math.abs(this.z - bz) > 1000) {
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
        input.mousemove(this, this.updatePos);
    }
    
    return {
        init: init
    }
}());

var AIPad = Pad.extend(function() {
    var ball;
    
    function init(zpos, surface, _ball) {
        ball = _ball;
        this._super(zpos, surface);
    }
    
    function update(elapsed) {
        this.updatePos.apply(this, ball.getPosition());
    }
    
    return {
        init: init,
        update: update
    }
}())