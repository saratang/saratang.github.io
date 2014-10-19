<DOCTYPE! html>
<html>
	<head>
		<title>About Me</title>
		<base href="blog.php"
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
			</div></a>
			<div class="menu">
				<ul>
					<li><a href>Home</a></li>
					<li><a href='archive.php'>Archive</a></li>
					<li><a href='aboutme.php'>About Me</a></li>
					<li><a href='newpost.php'>Add a Post!</a></li>
				</ul>
			</div>
			<div class="main">
				<div class="blog_post">
					<div class="post_title">Congratulations!</div>
					<div class="post_content">
						<p><?php
							$username = 'sara_tang';
							$password = 'canada4ever';

							$con = mysqli_connect(localhost, $username, $password, 'Blog');

							if (mysqli_connect_errno()) {
								echo 'Failed to connect to MySQL: ' . mysqli_connect_error();
							} else

							//escape variables!
							$postTitle = mysqli_real_escape_string($con, $_POST['posttitle']);
							$postContent = mysqli_real_escape_string($con, $_POST['postcontent']);

							$insert = "INSERT INTO Posts (PostTitle, PostContent)
							VALUES ('$postTitle', '$postContent');";
							if (mysqli_query($con, $insert)) {
								echo "The following information was added to your database:";
								echo "<br>";
								echo "Post title: " . $postTitle;
								echo "<br>";
								echo "Post content: " . $postContent;
							} else {
								echo "Error inserting information: " . mysqli_error($con);
							}
							mysqli_close($con)
						?></p>
					<div>
				</div>
			</div>
		</div>
	</body>
</html>