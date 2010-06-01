var events = (function() {
    
    var listeners = {};
    
    function subscribe(name, cb) {
        if (typeof listeners[name] == "undefined") {
            listeners[name] = [];
        }
        listeners[name].push(cb);
    }
    
    function fire(name) {
        var arguments = Array.prototype.slice(1, arguments);
        for (var i = 0; i < listeners[name].length; i++) {
            listeners[name][i].apply(arguments);
        }
    }
    
    return {
        subscribe: subscribe,
        fire: fire
    }
    
}());