var events = (function() {
    
    var listeners = {};
    
    function subscribe(name, obj, cb) {
        if (typeof listeners[name] == "undefined") {
            listeners[name] = [];
        }
        listeners[name].push([obj, cb]);
    }
    
    function fire(name) {
        var arguments = Array.prototype.slice.call(arguments, 1);
        var length = listeners[name].length;
        for (var i = 0; i < length; i++) {
            var obj = listeners[name][i];
            obj[1].apply(obj[0], arguments);
        }
    }
    
    return {
        subscribe: subscribe,
        fire: fire
    }
    
}());