const Collider = require('./collider');
const {vec2} = require('gl-matrix');


class Fish extends Collider {
    constructor(simulator, id, params) {
        super();

        this.__simulator__ = simulator;
        this.__id__ = id;
        this.__frame__ = null;
        this.__die__ = false;
        this.__path__ = null;
        this.__target__ = null;

        this.init(params);
    }

    getId() {
        return this.__id__;
    }

    getFrame() {
        return this.__frame__;
    }

    getElapsedFrames() {
        return this.__simulator__.getFrame() - this.__frame__;
    }

    isDied() {
        return this.__die__;
    }

    init({bodies, path}) {
        this.__frame__ = this.__simulator__.getFrame();
        this.__path__ = path;
        this.__target__ = this.__path__[0];
        this.createBodies(bodies || []);
        this.move();
    }

    move() {
        if(!this.__target__) {
            return;
        }

        this.setPosition(vec2.fromValues(this.__target__[0], this.__target__[1]));
        this.onMove();
    }

    onMove() {
        this.__target__ = this.__path__[(this.getElapsedFrames() + 1) * this.__simulator__.config('frame.update')];

        if(!this.__target__) {
            return;
        }

        this.setVelocity(vec2.sub(vec2.create(), vec2.fromValues(this.__target__[0], this.__target__[1]), this.getPosition()));
    }

    die() {
        this.__die__ = true;
    }

    clear() {}
}


module.exports = Fish;
