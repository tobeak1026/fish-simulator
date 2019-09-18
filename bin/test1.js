const Simulator = require('../index');


let sim = new Simulator();
sim.startup();

console.log(sim);

let a = [];
console.log(a.some(i => i > 0));