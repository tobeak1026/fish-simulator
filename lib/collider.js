const {vec2} = require('gl-matrix');
const {Polygon, Result} = require('detect-collisions');
const util = require('./util');
const _ = require('lodash');


const result = new Result();


class Collider {
    constructor() {
        this.__position__ = vec2.create();
        this.__rotation__ = 0;
        this.__scale__ = vec2.fromValues(1, 1);
        this.__bodies__ = [];
    }

    getPosition() {
        return vec2.clone(this.__position__);
    }

    setPosition(x, y) {
        if(_.isObject(x)) {
            y = x[1];
            x = x[0];
        }

        vec2.set(this.__position__, x, y);
        this.__bodies__.forEach(b => {
            b.x = x;
            b.y = y;
        });
    }

    getRotation() {
        return this.__rotation__;
    }

    setRotation(radian) {
        this.__rotation__ = radian;
        this.__bodies__.forEach(b => {
            b.angle = radian;
        });
    }

    getVelocity() {
        return vec2.rotate(vec2.create(), vec2.fromValues(1, 0), vec2.create(), this.getRotation());
    }

    setVelocity(x, y) {
        if(_.isObject(x)) {
            y = x[1];
            x = x[0];
        }

        this.setRotation(Math.atan2(y, x));
    }

    getScale() {
        return vec2.clone(this.__scale__);
    }

    setScale(x, y) {
        if(_.isObject(x)) {
            y = x[1];
            x = x[0];
        }

        vec2.set(this.__scale__, x, y);
        this.__bodies__.forEach(b => {
            b.scale_x = x;
            b.scale_y = y;
        });
    }

    addBody(body) {
        this.__bodies__.push(body);
        return body;
    }

    createBody(points) {
        let body = this.addBody(new Polygon(0, 0, points));
        body.x = this.__position__[0];
        body.y = this.__position__[1];
        body.angle = this.__rotation__;
        body.scale_x = this.__scale__[0];
        body.scale_y = this.__scale__[1];
        return body;
    }

    createBodies(bodies) {
        return bodies.map(points => this.createBody(points));
    }

    createRect(w, h, ox = 0, oy = 0) {
        return this.createBody(util.rectPoints(w, h, ox, oy));
    }

    getBody(index) {
        return this.__bodies__[index];
    }

    getBodies() {
        return this.__bodies__;
    }

    collide(collider, index) {
        let body = this.getBody(index);
        return body && collider.getBodies().some(b => b.collides(body));
    }

    collides(collider) {
        return this.__bodies__.some(a => {
            return collider.getBodies().some(b => b.collides(a, result));
        });
    }

    draw(ctx) {
        this.__bodies__.forEach(body => {
            body.draw(ctx);
        });
    }
}


module.exports = Collider;