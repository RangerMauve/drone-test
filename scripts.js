function $(query) {
	return [].slice.call(document.querySelectorAll(query));
}

var controls = $("#controls")[0];
var command_container = $("#command")[0];
var args_container = $("#args")[0];
var preview = $("#preview")[0];

function execute(command, args) {
	if (!args) args = "[]";
	reqwest("/drone/" + command + "?args=" + escape(args), function () {
		console.log("Sent");
	});
}

controls.addEventListener("submit", function (e) {
	e.preventDefault();
	var com = command_container.value;
	var args = args_container.value;
	execute(com, args);
});

setInterval(function () {
	preview.src = "/png?bust=" + random();
}, 500);

function random() {
	return Math.round(Math.random() * 21337);
}
