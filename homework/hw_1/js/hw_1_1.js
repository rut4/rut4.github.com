$(function () {
	var touch = 'ontouchstart' in window;
	if (touch) {
		$(".profile").addClass("no-touch");
	}
})