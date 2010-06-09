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
        
        // Set up timer
        last = now();
    }

    // Main game loop
    function update() {
        // Manage game timer
        var elapsed = now() - last;
        last = now();

        // Update all objects
        for(i in objects) {
            objects[i].update(elapsed);
        }
        
        // Draw them to the screen
        gfx.clear();
        for(i in objects) {
            objects[i].draw();
        }
    }
    
    function service() {
        // activate timer
        last = now();
        setInterval(update, 1000 / FPS);
    }
    
    $(document).ready(init);
    
    return {
        update: update
    }
}());