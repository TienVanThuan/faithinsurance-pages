$(window).scroll(function () {
	if ($(window).scrollTop() > 0) {
		$('.l-header').addClass('is-scrolled');
	} else {
		$('.l-header').removeClass('is-scrolled');
	}
});

//header menu
jQuery(function ($) {
	$('#spnav').hide();
	$('#spnav-toggle').click(function () {
		$(this).stop().toggleClass('active');
		if ($(this).hasClass('active')) {
			$('#spnav').slideDown();
		} else {
			$('#spnav').slideUp();
		}
	});
});

const
	megaSpBtn = $('.spnav-subtrg');
megaSpBtn.on('click', function () {
	$(this).stop().toggleClass('is-active').next().slideToggle(300);
});


$(function () {
	$('a[href^="#"]').click(function () {
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({
			scrollTop: position
		}, speed, "swing");
		return false;
	});
});


$(function () {
	var topBtn = $('.pagetop-btn');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 80) {
			topBtn.addClass("is-scrolled");
		} else {
			topBtn.removeClass("is-scrolled");
		}
		// scrollHeight = $(document).height();
		// scrollPosition = $(window).height() + $(window).scrollTop();
		// footHeight = $(".l-footer").innerHeight();
		// if (scrollHeight - scrollPosition <= footHeight) {
		// 	topBtn.css({
		// 		"position": "absolute",
		// 		"bottom": footHeight + 16
		// 	});
		// } else {
		// 	topBtn.css({
		// 		"position": "fixed",
		// 		"bottom": "1rem"
		// 	});
		// }
	});

	topBtn.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
});

// simplePARALLAX
var images = document.querySelectorAll('.p-img');
new simpleParallax(images, {
	scale: 1.25
});

$(document).ready(function () {
	var sticky = new Sticky('[data-sticky]');
});
lightbox.option({
	'disableScrolling': true,
})

$(".target").click(function () {
	$('html').addClass("lb-disable");
});
// $('body').click(function (e) {
// 	console.log(e.target);
// 	if ($('html').hasClass("lb-disable")) {
// 		$('html').removeClass("lb-disable");
// 	}
// });

$(document).on('mouseup', function (e) {
	if ($('.lb-close').is(e.target)) {
		if ($('html').hasClass("lb-disable")) {
			$('html').removeClass("lb-disable");
		}
	}
})

$(document).on('click', function (e) {
	console.log(e.target);
	if ($('html').hasClass("lb-disable")) {
		$('html').removeClass("lb-disable");
		$('body').css({
			'position': 'relative',
		});
		releaseScrolling();
	}

});

var pointY;
$('[data-lightbox="roadtrip"]').on("click", function () {
	pointY = $(window).scrollTop();
	console.log(pointY);
	$('body').css({
		'position': 'fixed',
		'width': '100%',
		'top': -pointY,
		'padding-right': 0
	});
});
// Return to the initial state after modal close
function releaseScrolling() {
	$('body').css({
		'position': 'relative',
		'width': '',
		'top': '',
		'padding-right': 0
	});
	$(window).scrollTop(pointY);
}
$('.lightbox').on("click", function (e) {
	if (e.target !== this)
		return;
	$('body').css({
		'position': 'relative',
	});
	releaseScrolling();
});
