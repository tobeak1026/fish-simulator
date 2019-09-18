const Collider = require('./collider');
const Super = require('./component');


class Scene extends Super {
    constructor(...args) {
        super(...args);

        this.__wall__ = null;
    }

    collide(collider, index) {
        return this.__wall__.collide(collider, index);
    }

    collides(collider) {
        return this.__wall__.collides(collider);
    }

    startup() {
        let width = this.__simulator__.config('scene.width');
        let height = this.__simulator__.config('scene.height');
        this.__wall__ = new Collider();
        this.__wall__.createRect(100, height * 2, (width + 100) / 2, 0);
        this.__wall__.createRect(width * 2, 100, 0, (height + 100) / 2);
        this.__wall__.createRect(100, height * 2, -(width + 100) / 2, 0);
        this.__wall__.createRect(width * 2, 100, 0, -(height + 100) / 2);
    }
}


module.exports = Scene;
