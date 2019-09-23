const BulletManager = require('./bullet_manager');
const FishManager = require('./fish_manager');
const Scene = require('./scene');


class Simulator {
    constructor() {
        this.__components__ = {};
        this.__configuration__ = {};
        this.__frame__ = 1;

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

    getFrame() {
        return this.__frame__;
    }

    config(key, value) {
        return (value === undefined) ? this.getConfiguration(key) : this.setConfiguration(key, value);
    }

    draw(ctx) {
        this.comp('scene').draw(ctx);
        this.comp('bullet').draw(ctx);
        this.comp('fish').draw(ctx);
    }

    init() {
        this.comp('bullet', new BulletManager(this));
        this.comp('fish', new FishManager(this));
        this.comp('scene', new Scene(this));

        this.config('bullet.width', 20);            // 子弹宽
        this.config('bullet.height', 60);           // 子弹高
        this.config('bullet.power', 10);            // 子弹强度(爆炸范围)
        this.config('bullet.speed', 10);            // 子弹速度(最小帧频内移动的距离)
        this.config('fish.scheduler', null);        // 鱼生成调度器
        this.config('frame.tick', 10);              // 最小帧频(ms)
        this.config('frame.update', 1);             // 更新帧频(最小帧频)
        this.config('handler.hit', null);           // 子弹击中鱼
        this.config('scene.wall', 100);             // 墙体厚度
        this.config('scene.width', 1280);           // 场景宽
        this.config('scene.height', 720);           // 场景高
    }

    startup() {
        Object.values(this.__components__).forEach(comp => {
            comp.startup();
        });
    }

    frame() {
        let msg = {frame: ++this.__frame__};
        this.comp('bullet').move(msg);
        this.comp('fish').move(msg);
        this.comp('bullet').unschedule(msg);
        this.comp('fish').unschedule(msg);
        this.comp('bullet').collideWithScene(msg);
        this.comp('bullet').collideWithFish(msg);
        this.comp('bullet').clean();
        this.comp('fish').clean();
        return msg;
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