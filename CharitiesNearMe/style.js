$(function() {
	$('#refine_search').hide();
	$('#refine_button').click(function() {
		$('#refine_search').slideToggle('slow');
	});
});