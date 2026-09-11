// floating-item js here

jQuery(document).ready(function (jQuery) {
	"use strict";
});

// Banner Moving JS Start
var floatingX = 0,
	floatingY = 0,
	x = 0,
	y = 0,
	friction = 1 / 30;

function floatingBg() {
	x += (floatingX - x) * friction;
	y += (floatingY - y) * friction;

	//  translate = 'translateX(' + x + 'px, ' + y + 'px)';
	translate = 'translateX(' + x + 'px) translateY(' + y + 'px)';

	jQuery('.floating-item').css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});

	window.requestAnimationFrame(floatingBg);
}

jQuery(window).on('mousemove click', function (e) {

	var isHovered = jQuery('.floating-item:hover').length > 0;

	if (!isHovered) {
		var lMouseX = Math.max(-100, Math.min(100, jQuery(window).width() / 2 - e.clientX)),
			lMouseY = Math.max(-100, Math.min(100, jQuery(window).height() / 2 - e.clientY));

		floatingX = (20 * lMouseX) / 100;
		floatingY = (10 * lMouseY) / 100;
	}
});

floatingBg();




