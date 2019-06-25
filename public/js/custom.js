(function()
{
    let target = EventTarget.prototype;
    let functionName = 'addEventListener';
    let func = target[functionName];

    let symbolHidden = Symbol('hidden');

    function hidden(instance)
    {
        if(instance[symbolHidden] === undefined)
        {
            let area = {};
            instance[symbolHidden] = area;
            return area;
        }

        return instance[symbolHidden];
    }

    function listenersFrom(instance)
    {
        let area = hidden(instance);
        if(!area.listeners) { area.listeners = []; }
        return area.listeners;
    }

    target[functionName] = function(type, listener)
    {
        let listeners = listenersFrom(this);

        listeners.push({ type, listener });

        func.apply(this, [type, listener]);
    };

    target['removeEventListeners'] = function(targetType)
    {
        let self = this;

        let listeners = listenersFrom(this);
        let removed = [];

        listeners.forEach(item =>
        {
            let type = item.type;
            let listener = item.listener;

            if(type == targetType)
            {
                self.removeEventListener(type, listener);
            }
        });
    };
})();