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

app.get("/png", function() {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});


app.listen(8080);
console.log('Drone Server Started...');
reset_client();

var pngEncoder = c.getPngStream();
var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });




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
