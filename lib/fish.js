const Collider = require('./collider');


class Fish extends Collider {
    constructor(simulator, params) {
        super();

        this.__simulator__ = simulator;

        this.init(params);
    }

    init({}) {

    }
}


module.exports = Fish;
