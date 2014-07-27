var express = require("express");
var app = express();
var c;

app.use(express.static(__dirname));

app.get("/drone/:command", function (req, res) {
	var command = req.param("command");
	var args = req.param("args");
	if (args) args = JSON.parse(args);
	console.log("Calling", command, args);
	if (c) c[command].apply(c, args);
	res.send(200, "");
});

app.listen(80);

reset_client();
/*
c.takeoff();
c.after(5000, function () {
	this.clockwise(0.5);
}).after(3000, function () {
	this.animate('flipLeft', 15);
}).after(1000, function () {
	this.stop();
	this.land();
});
*/

function reset_client() {
	c = require('ar-drone').createClient();
}
