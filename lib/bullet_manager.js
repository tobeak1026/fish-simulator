const Bullet = require('./bullet');
const Super = require('./component');


class BulletManager extends Super {
    constructor(...args) {
        super(...args);

        this.__id__ = 0;
        this.__bullets__ = [];
        this.__schedules__ = [];
    }

    addBullet(bullet) {
        this.__bullets__.push(bullet);
        return bullet;
    }

    createBullet(params = {}) {
        return this.addBullet(new Bullet(this.__simulator__, ++this.__id__, params));
    }

    getBullet(index) {
        return this.__bullets__[index];
    }

    getBulletById(id) {
        return this.__bullets__.find(bullet => {
            return bullet.getId() === id;
        });
    }

    move() {
        this.__bullets__.forEach(bullet => {
            bullet.move();
        });
    }

    schedule(frame, params) {
        this.__schedules__.push({frame: frame || (this.__simulator__.getFrame() + 1), params});
    }

    __unschedule__(msg, {frame, params}) {
        if(frame > this.__simulator__.getFrame()) {
            return false;
        }

        if(frame < this.__simulator__.getFrame()) {
            return true;
        }

        this.createBullet(params);
        return true;
    }

    unschedule(msg) {
        while(this.__schedules__.length && this.__unschedule__(msg, this.__schedules__[0])) {
            this.__schedules__.shift();
        }
    }

    collideWithScene() {
        this.__bullets__.forEach(bullet => {
            bullet.collideWithScene();
        });
    }

    collideWithFish() {
        this.__bullets__.forEach(bullet => {
            bullet.collideWithFish();
        });
    }

    clean() {
        this.__bullets__ = this.__bullets__.filter(bullet => {
            return !bullet.isDied();
        });
    }
}


module.exports = BulletManager;