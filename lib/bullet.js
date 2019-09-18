const Collider = require('./collider');
const {vec2} = require('gl-matrix');


class Bullet extends Collider {
    constructor(simulator, id, params) {
        super();

        this.__simulator__ = simulator;
        this.__id__ = id;
        this.__speed__ = 0;

        this.init(params);
    }

    getId() {
        return this.__id__;
    }

    init({width, height, speed}) {
        this.__speed__ = speed;

        this.createRect(width, height);
    }
}


module.exports = Bullet;