const Super = require('./component');


class BulletManager extends Super {
    constructor(...args) {
        super(...args);

        this.__bullets__ = [];
    }

    move() {
        this.__bullets__.forEach(b => {
            b.move();
        });
    }

    schedule() {

    }

    collideWithScene() {

    }

    collideWithFish() {
        
    }

    clean() {

    }
}


module.exports = BulletManager;