var util=require("util");
var EventEmitter=require("events").EventEmitter;

var Class =function(){}

util.inherits(Class, EventEmitter);

Class.prototype.start=function(data){
	
	this.emit("started",data);
};

module.exports=Class;
