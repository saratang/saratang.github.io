<!DOCTYPE html>
<html>
	<head>
		<title>Sara's Blog</title>
		<base href="blog.php">
		<link rel="shortcut icon" href="img/Winter Favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/blog.css">
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.24/ui/jquery-ui.js"></script>
		<script type="text/javascript" src="js/blog.js"></script>
	</head>
	<body>
		<div class="content">
			<div class="header">
				<div class="logo"><a href><img src='img/Senioritis Winter Logo.png'></a></div>
			</div>
			<div class="menu">
				<ul>
					<li id="homeButton"><a href='blog.php'>Home</a></li>
					<li id="archiveButton"><a href='archive.php'>Archive</a></li>
					<li id="aboutmeButton"><a href='aboutme.php'>About Me</a></li>
					<li id="addapostButton"><a href="newpost.php">Add a Post!</a></li>
				</ul>
			</div>
			<div class="main">
				<div class="blog_post" id="post3">
					<div class="post_title"><a href='posts/post3.php'>Capital</a></div>
					<div class="post_content">
						<p>Monday, December 16th, 2013</p>
						<p>Didn't get to do much on the blog today because we visited our new apartment at Capital. It's gonna be pretty cool I guess, lots of people I know live there and plus it's so much closer to school...Damn I need to figure out this SQL? PHP? Thing</p>
					</div>
				</div>
				<div class="blog_post" id="post2">
					<div class="post_title"><a href='posts/post2.php'>Well...</a></div>
					<div class="post_content">
						<p>Sunday, December 15th, 2013</p>
						<p>As you can see, I haven't exactly figured out how to post using the "Add a Post" page yet... I've (finally) figured out the javascript (well no I cheated and used jquery) but hm now I need something called PHP to store the data :/ What</p>
					</div>
				</div>
				<div class="blog_post" id="post1">
					<div class="post_title"><a href='posts/post1.php'>Oh no!</a></div>
					<div class="post_content">
						<p>Saturday, December 14th, 2013</p>
						<p>You don't have any posts yet! You can add your first post by clicking on "Add a Post!"</p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
