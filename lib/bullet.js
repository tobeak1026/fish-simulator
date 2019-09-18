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
        this.__speed__ = speed || this.__simulator__.config('bullet.speed') || 0;

        this.createRect(width || this.__simulator__.config('bullet.width'), height || this.__simulator__.config('bullet.height'));
    }

    move() {
        this.setPosition(vec2.scaleAndAdd(vec2.create(), this.getPosition(), this.getVelocity(), this.__speed__ * this.__simulator__.config('frame.update')));
    }

    __collideWithSceneX__() {
        let v = this.getVelocity();

        if((v[0] > 0) && this.__simulator__.comp('scene').collide(this, 0)) {
            this.setVelocity(vec2.set(v, -v[0], v[1]));
            return;
        }

        if((v[0] < 0) && this.__simulator__.comp('scene').collide(this, 2)) {
            this.setVelocity(vec2.set(v, -v[0], v[1]));
            return;
        }
    }

    __collideWithSceneY__() {
        let v = this.getVelocity();

        if((v[1] > 0) && this.__simulator__.comp('scene').collide(this, 1)) {
            this.setVelocity(vec2.set(v, v[0], -v[1]));
            return;
        }

        if((v[1] < 0) && this.__simulator__.comp('scene').collide(this, 3)) {
            this.setVelocity(vec2.set(v, v[0], -v[1]));
            return;
        }
    }

    collideWithScene() {
        this.__collideWithSceneX__();
        this.__collideWithSceneY__();
    }
}


module.exports = Bullet;