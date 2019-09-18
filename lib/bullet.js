const Collider = require('./collider');
const {vec2} = require('gl-matrix');


class Bullet extends Collider {
    constructor(simulator, params) {
        super();

        this.__simulator__ = simulator;
        this.__speed__ = 0;

        this.init(params);
    }

    init({width, height}) {
        this.createRect(width, height);
    }
}


module.exports = Bullet;