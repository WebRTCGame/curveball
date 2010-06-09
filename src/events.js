var events = (function() {
    
    var listeners = {};
    
    function subscribe(name, cb) {
        if (typeof listeners[name] == "undefined") {
            listeners[name] = [];
        }
        listeners[name].push(cb);
    }
    
    function fire(name) {
        var arguments = Array.prototype.slice.call(arguments, 1);
        var length = listeners[name].length;
        for (var i = 0; i < length; i++) {
            var obj = listeners[name][i];
            obj.apply(obj, arguments);
        }
    }
    
    return {
        subscribe: subscribe,
        fire: fire
    }
    
}());