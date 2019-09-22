const Collider = require('./collider');
const {vec2} = require('gl-matrix');


class Bullet extends Collider {
    constructor(simulator, id, params) {
        super();

        this.__simulator__ = simulator;
        this.__id__ = id;
        this.__die__ = false;
        this.__power__ = 0;
        this.__speed__ = 0;

        this.init(params);
    }

    getId() {
        return this.__id__;
    }

    isDied() {
        return this.__die__;
    }

    init({width, height, x, y, rotation, power, speed}) {
        this.__power__ = power || this.__simulator__.config('bullet.power') || 0;
        this.__speed__ = speed || this.__simulator__.config('bullet.speed') || 0;
        this.createRect(height || this.__simulator__.config('bullet.height'), width || this.__simulator__.config('bullet.width'));
        this.setPosition(x || 0, y || 0);
        this.setRotation(rotation || 0);
    }

    move() {
        this.setPosition(vec2.scaleAndAdd(vec2.create(), this.getPosition(), this.getVelocity(), this.__speed__ * this.__simulator__.config('frame.update')));
    }

    __collideWithSceneX__() {
        let v = this.getVelocity();

        if((v[0] > 0) && this.__simulator__.comp('scene').collide(this, 0)) {
            this.setVelocity(vec2.fromValues(-v[0], v[1]));
            return;
        }

        if((v[0] < 0) && this.__simulator__.comp('scene').collide(this, 2)) {
            this.setVelocity(vec2.fromValues(-v[0], v[1]));
            return;
        }
    }

    __collideWithSceneY__() {
        let v = this.getVelocity();

        if((v[1] > 0) && this.__simulator__.comp('scene').collide(this, 1)) {
            this.setVelocity(vec2.fromValues(v[0], -v[1]));
            return;
        }

        if((v[1] < 0) && this.__simulator__.comp('scene').collide(this, 3)) {
            this.setVelocity(vec2.fromValues(v[0], -v[1]));
            return;
        }
    }

    collideWithScene() {
        this.__collideWithSceneX__();
        this.__collideWithSceneY__();
    }

    collideWithFish() {
        if(!this.__simulator__.comp('fish').collides(this)) {
            return;
        }

        this.explore();
    }

    explore() {
        this.__simulator__.comp('fish').hits(this.getPosition(), this.__power__).forEach(fish => {
            this.hit(fish);
        });
        this.die();
    }

    hit(fish) {
        let handler = this.__simulator__.config('handler.hit'); 
        handler && handler(this.__simulator__, this, fish) && fish.die();
    }

    die() {
        this.__die__ = true;
    }

    clear() {}
}


module.exports = Bullet;