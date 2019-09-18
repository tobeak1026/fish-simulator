const {Circle} = require('detect-collisions');
const Fish = require('./fish');
const Super = require('./component');


class FishManager extends Super {
    constructor(...args) {
        super(...args);

        this.__id__ = 0;
        this.__fishes__ = [];
        this.__schedules__ = [];
    }

    addFish(fish) {
        this.__fishes__.push(fish);
        return fish;
    }

    createFish(params = {}) {
        return this.addFish(new Fish(this.__simulator__, ++this.__id__, params));
    }

    getFish(index) {
        return this.__fishes__[index];
    }

    getFishById(id) {
        return this.__fishes__.find(fish => {
            return fish.getId() === id; 
        });
    }

    collides(collider) {
        return this.__fishes__.some(fish => {
            return fish.collides(collider);
        });
    }

    hits(position, radius) {
        let circle = new Circle(position[0], position[1], radius);
        return this.__fishes__.filter(fish => {
            return fish.getBodies().some(body => body.collides(circle));
        });
    }

    move() {
        this.__fishes__.forEach(fish => {
            fish.move();
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

        this.createFish(params);
        return true;
    }

    unschedule(msg) {
        while(this.__schedules__.length && this.__unschedule__(msg, this.__schedules__[0])) {
            this.__schedules__.shift();
        }
    }

    clean() {
        this.__fishes__ = this.__fishes__.filter(fish => {
            return !fish.isDied();
        });
    }
}


module.exports = FishManager;