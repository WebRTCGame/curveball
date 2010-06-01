var game = (function() {
    
    var background, interval;
    
    function init() {
        // Initialize subsystems
        gfx.init('#screen');
        input.init('#screen');

        // Initialize objects
        background = new Background();
        ball.init();
        pad.init();
        
        // Register events
        events.subscribe('service', service);
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
    
    function service() {
        // activate timer
        setInterval(update, 1000 / FPS);
    }
    
    $(document).ready(init);
    
    return {
        update: update
    }
}());