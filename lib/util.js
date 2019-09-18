let util = module.exports = {};


util.rectPoints = (w, h, ox = 0, oy = 0) => {
    return [
        [w / 2 + ox, h / 2 + oy],
        [-w / 2 + ox, h / 2 + oy],
        [-w / 2 + ox, -h / 2 + oy],
        [w / 2 + ox, -h / 2 + oy],
    ];
};