const Simulator = require('../index');


let sim = new Simulator();
sim.startup();
sim.frame();
sim.frame();
console.log(sim);
