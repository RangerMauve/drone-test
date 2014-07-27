var c = require('ar-drone').createClient();
c.takeoff();

c.after(5000, function () {
	this.clockwise(0.5);
}).after(3000, function () {
	this.animate('flipLeft', 15);
}).after(1000, function () {
	this.stop();
	this.land();
});
