$(function() {
	$('#refine_search').hide();
	$('#refine_button').click(function() {
		$('#refine_search').slideToggle('slow');
	});

	$("#button").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#refine_button").offset().top
	    }, 2000);
	});
});