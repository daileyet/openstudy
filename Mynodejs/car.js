//car.js

var wheels=require("./wheel.js");

wheels.init("winter");

wheels.info();


var Engine = require("./engine.js");
var e = new Engine();
e.forward();


var Control = require("./control.js");
var c = new Control();
c.forward();
c.right();


var AirCondtioning=require("./air.js");
var air=new AirCondtioning();
air.on("started",function(data){
	console.log("Air conditioning started "+data);
});


air.start("data");