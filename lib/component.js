class Component {
    constructor(simulator) {
        this.__simulator__ = simulator;
    }

    comp(...args) {
        return this.__simulator__.comp(...args);
    }

    startup() {}

    shutdown() {}

    clear() {}
}


module.exports = Component;
