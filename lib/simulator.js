const BulletManager = require('./bullet_manager');
const FishManager = require('./fish_manager');
const SceneManager = require('./scene_manager');


class Simulator {
    constructor() {
        this.__components__ = {};
        this.__configuration__ = {};
        this.__bulletManager__ = null;
        this.__fishManager__ = null;
        this.__scene__ = null;

        this.init();
    }

    getComponent(key) {
        return this.__components__[key];
    }

    setComponent(key, value) {
        return (this.__components__[key] = value);
    }

    comp(key, value) {
        return (value === undefined) ? this.getComponent(key) : this.setComponent(key, value);
    }

    getConfiguration(key) {
        return this.__configuration__[key];
    }

    setConfiguration(key, value) {
        return (this.__configuration__[key] = value);
    }

    config(key, value) {
        return (value === undefined) ? this.getConfiguration(key) : this.setConfiguration(key, value);
    }

    init() {
        this.comp('bullet', new BulletManager(this));
        this.comp('fish', new FishManager(this));
        this.comp('scene', new SceneManager(this));
        this.config('scene.width', 1280);           // 场景宽
        this.config('scene.height', 720);           // 场景高
        this.config('frame.update', 10);            // 更新帧频 相对于最小帧频
    }

    startup() {
        Object.values(this.__components__).forEach(comp => {
            comp.startup();
        });
    }

    frame() {
        
    }

    shutdown() {
        Object.values(this.__components__).forEach(comp => {
            comp.shutdown();
        });
        this.clear();
    }

    clear() {
        Object.values(this.__components__).forEach(comp => {
            comp.clear();
        });
    }
}


module.exports = Simulator;