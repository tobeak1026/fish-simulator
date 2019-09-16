class Simulator {
    constructor() {
        this.__configuration__ = {};
    }

    getConfiguration(key) {
        return this.__configuration__[key];
    }

    setConfiguration(key, value) {
        return (this.__configuration__[key] = value);
    }

    init() {
        this.config('scene.width',          1280);
        this.config('scene.height',         720);
    }

    config(key, value) {
        return (value === undefined) ? this.getConfiguration(key) : this.setConfiguration(key, value);
    }
}


module.exports = Simulator;