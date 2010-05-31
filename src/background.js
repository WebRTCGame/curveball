LINES = 10;
LINECOLOR = "#0f0";

var background = (function() {
    
    function draw() {
        // Adapt the color according to the z value
        function colorOf(z) {
            var red = 0;
            var green = 255 - (1000 - z) * 0.017;
            var blue = 102 - (1000 - z) * 0.068;
            return gfx.color(red, green, blue);
        }
        
        // Draw the rectangles
        var last = -100;
        for (var z = 0; z <= 1000; z += 1000 / LINES) {
            gfx.drawRect(0, 0, 1000, 750, z, colorOf(z));
            if (last >= 0) {
                gfx.drawLine(0, 0, last, 0, 0, z, colorOf(z));
                gfx.drawLine(1000, 0, last, 1000, 0, z, colorOf(z));
                gfx.drawLine(0, 750, last, 0, 750, z, colorOf(z));
                gfx.drawLine(1000, 750, last, 1000, 750, z, colorOf(z));
            }
            last = z;
        }
    }
    
    return {
        draw: draw
    }
}());
