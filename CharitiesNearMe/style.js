$(function() {
	$('.jumbotron').hide();
	$('#refine_button').click(function() {
		$('.jumbotron').slideToggle('slow');
	});

	$("#button").click(function() {
	    $('.jumbotron').slideUp('slow', function() {
	   		$('html, body').animate({
				scrollTop: $("#refine_button").offset().top
			}, 500);
	    });
	});
});