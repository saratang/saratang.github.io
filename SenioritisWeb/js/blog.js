$(document).ready(function() {
	var $window = $(window);
	var $stickyEl = $('.menu');
	elTop = $stickyEl.offset().top;
	$window.scroll(function() {
		$stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });

	var $menuLink = $("li > a");
	$menuLink.hover(
	function() {
   		$(this).animate({
   			color:"#5CBDDE"},
   			300);
   	},
	function() {
   		$(this).animate({
   			color: "#708090"},
   			300);
   	});
	
	var $archiveButton = $("#archiveButton");
	$archiveButton.hover(function() {
	});

	var $submit = $("#submitPost");
	var $postNumber = 1;
	$submit.click(function() {
		var $postTitle = $("#formPostTitle").val();
		var $postContent = $("#formPostContent").val();
	 	if (($postTitle == "") || ($postContent == "")) {
	 		window.alert("You didn't post anything!");
		} else {
			$postNumber += 1;
			$('#newPostContent').prepend('<div id="post'+ $postNumber +'" class="blog_post"></div>');
			$("#post" + $postNumber).append('<div id="post_title' + $postNumber +'" class="post_title"></div>' +
				'<div id="post_content' + $postNumber +'" class="post_content"></div>');
			$("#post_title" + $postNumber).append($postTitle);
			$("#post_content" + $postNumber).append($postContent);
			return $postNumber;
		}
	});
});

//What I want to do:
//Prepend the newest post to the existing ones.
	//Prepend the divs, assign ID's to the divs
		//Automatically give the new post an ID of "PostID" from the table "Posts" from the database "Blog"
	//Add content to the divs