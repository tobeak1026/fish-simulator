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

    draw(ctx) {
        this.__wall__.draw(ctx);
    }

    startup() {
        let wall = this.__simulator__.config('scene.wall');
        let width = this.__simulator__.config('scene.width');
        let height = this.__simulator__.config('scene.height');
        this.__wall__ = new Collider();
        this.__wall__.createRect(wall, height + wall * 2, (width + wall) / 2, 0);
        this.__wall__.createRect(width + wall * 2, wall, 0, (height + wall) / 2);
        this.__wall__.createRect(wall, height + wall * 2, -(width + wall) / 2, 0);
        this.__wall__.createRect(width + wall * 2, wall, 0, -(height + wall) / 2);
    }
}


module.exports = Scene;
