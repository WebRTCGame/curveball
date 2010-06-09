var input = (function() {
    
    var ele;
    
    function init(id) {
        ele = $(id);
    }
    
    function boundBy(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
    
    function mousemove(obj, callback) {
        $(document).mousemove(function (e) {
            // Translate to in game coordinates
            var offset = ele.offset();
            
            // Cut off if over the edges
            var x = boundBy(e.pageX - offset.left, 0, gfx.getWidth());
            var y = boundBy(e.pageY - offset.top, 0, gfx.getHeight());
            
            // Translate back to projection
            x = projection.unX(x, 0);
            y = projection.unY(y, 0);
            
            callback.call(obj, x, y);
            
            game.update();
        });
    }
    
    function mousedown(callback) {
        $(document).click(function (e) {
            e.preventDefault();
            callback();
        });
    }

    return {
        init: init,
        mousedown: mousedown,
        mousemove: mousemove
    }
}());
