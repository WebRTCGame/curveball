var game = (function() {
    
    var objects = [], interval;
    
    function init() {
        // Initialize subsystems
        gfx.init('#screen');
        input.init('#screen');

        // Initialize objects
        objects.push(new Background());
        objects.push(new Ball());
        objects.push(new PlayerPad(0, 'pad'));
        
        // Register events
        events.subscribe('service', service);
    }

    // Main game loop
    function update() {
        var time = 1.0 / FPS;
        
        var elapsed = profile(function() {
            // Update all objects
            for(i in objects) {
                objects[i].update(time);
            }
            
            // Draw them to the screen
            gfx.clear();
            for(i in objects) {
                objects[i].draw();
            }
        });
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