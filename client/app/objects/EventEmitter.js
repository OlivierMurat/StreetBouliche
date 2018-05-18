export default class EventEmitter {

    constructor() {
        this.listeners = new Map();
        this.uniqListener = new Map();
        this.uniqEmiter = {};
    }

    forwardTo(object, label=null){
        if(label === null)
            label = "*";

        this.on(label, (...args) => {
            object.emit(label, ...args);
        })
    }

    /**
     *
     * @param label
     * @param callback
     * @return {EventEmitter}|null
     */
    on(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        let args = this.uniqEmitterFired(label);
        if (args){
            callback(...args);
        }
        else{
            this.listeners.get(label).push(callback);
        }


        return this;
    }

    onUniq(label, callback){
        this.uniqListener.has(label) || this.uniqListener.set(label, []);
        let args = this.uniqEmitterFired(label);
        if (args){
            callback(...args);
        }
        else{
            this.uniqListener.get(label).push(callback);
        }

    }

    off(label, callback) {
        let isFunction = function (obj) {
            return typeof obj === 'function' || false;
        };

        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (isFunction(listener) && listener === callback) ? i = index : i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }

    uniqEmitterFired(label) {
        if (this.uniqEmiter[label] !== undefined && this.uniqEmiter[label].fired !== false)
            return this.uniqEmiter[label].args;

        return false;
    }

    registerUniqEvent(label) {
        this.uniqEmiter[label] = {fired: false};
    }

    emit(label, ...args) {
        let listenersFound = false;
        if (this.uniqEmiter[label] !== undefined) {
            this.uniqEmiter[label] = {
                fired: true,
                args : args
            };
        }

        //get listeners
        let listeners = this.listeners.get(label) || [];

        (this.listeners.get("*") || []).forEach((listener) => {
            listeners.push(listener);
        });


        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });
            listenersFound = true;
        }

        //get listeners only once time
        let uniqListener = [];

        (this.uniqListener.get(label) || []).forEach((listener, index, object)=>{
            uniqListener.push(listener);
            object.splice(index, 1);
        });

        (this.uniqListener.get("*") || []).forEach((listener, index, object) => {
            uniqListener.push(listener);
            object.splice(index, 1);
        });

        if (uniqListener && uniqListener.length) {
            uniqListener.forEach((listener) => {
                listener(...args);
            });
            listenersFound = true;
        }



        return listenersFound;
    }
}