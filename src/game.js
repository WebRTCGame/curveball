var game = (function() {
    
    var background;
    
    function init() {
        // Initialize subsystems
        gfx.init('#screen');
        input.init('#screen');

        // Initialize objects
        background = new Background();
        ball.init();
        pad.init();

        // Initialize main loop
        //setInterval(update, 1000 / FPS);
    }

    // Main game loop
    function update() {
        var time = 1.0 / FPS;
        
        var elapsed = profile(function() {
            // Update objects
            ball.update(time);
        
            // Draw scene
            draw();
        });
    }
                
    function draw() {
        gfx.clear();
        background.draw();
        ball.draw();
        pad.draw();
    }
    
    $(document).ready(init);
    
    return {
        update: update
    }
}());