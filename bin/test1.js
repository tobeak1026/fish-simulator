const Simulator = require('../index');
const {vec2} = require('gl-matrix');


let sim = new Simulator();
sim.startup();
sim.comp('bullet').schedule(0, {});
sim.frame();

let b1 = sim.comp('bullet').getBullet(0);
b1.setRotation(Math.PI / 4);

// console.log(b1.getRotation());
// console.log(b1.getVelocity());
// 
// let v1 = vec2.create();
// vec2.rotate(v1, vec2.fromValues(1, 0), vec2.fromValues(0, 0), Math.PI);
// console.log(v1);
// 
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// console.log(b1.getPosition());
// sim.frame();
// sim.frame();
// sim.frame();
// 
// console.log(b1.getPosition());
// sim.frame();
// sim.frame();
// sim.comp('bullet').schedule(0, {});
// sim.comp('bullet').schedule(0, {});
// sim.frame();
// sim.frame();
// console.log(sim);
