<!DOCTYPE html>
<html>
	<head>
		<title>Add a Post!</title>
		<base href="blog.php">
		<link rel="shortcut icon" href="Winter Favicon.ico">
		<link rel="stylesheet" type="text/css" href="blog.css">
		<script type="text/javascript" src="jquery-1.10.2.js"></script>
		<script type="text/javascript" src="jquery-ui-1.8.24/ui/jquery-ui.js"></script>
		<script type="text/javascript" src="blog.js"></script>
	</head>
	<body>
		<div class="content">
			<div class="header">
				<div class="logo"><a href><img src='Senioritis Winter Logo.png'></a></div>
			</div>
			<div class="menu">
				<ul>
					<li><a href>Home</a></li>
					<li><a href='archive.php'>Archive</a></li>
					<li><a href='aboutme.php'>About Me</a></li>
					<li><a href="newpost.php">Add a Post!</a></li>
				</ul>
			</div>
			<div class='main' id="newPostContent">
				<div class='blog_post'>
					<div class="post_title">Add a Post</div>
					<form action='insertPost.php' method = 'post'>
						<p>Title of Post: <br><input type="text" name="posttitle" id="formPostTitle"/></p><br>
						<textarea type="text" name="postcontent" id="formPostContent" placeholder="What's up?"></textarea><br>
						<input type="submit" value="Add Post!" id="submitPost"/>
					</form>
				</div>
			</div>
		</div>
	</body>