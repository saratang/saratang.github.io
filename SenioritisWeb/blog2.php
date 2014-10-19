<!DOCTYPE html>
<html>
	<head>
		<title>Sara's Blog</title>
		<link rel="shortcut icon" href="Winter Favicon.ico">
		<link rel="stylesheet" type="text/css" href="blog.css">
		<script type="text/javascript" src="jquery-1.10.2.js"></script>
		<script type="text/javascript" src="jquery-ui-1.8.24/ui/jquery-ui.js"></script>
		<script type="text/javascript" src="blog.js"></script>
	</head>
	<body>
		<div class="content">
			<div class="header">
				<div class="logo"><a href='blog.php'><img src='Senioritis Winter Logo.png'></a></div>
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
				<?php
					function title($ID) {
						$con = mysqli_connect(localhost, 'sara_tang', 'canada4ever', 'Blog');
						$titleArray = mysqli_query($con, "SELECT * FROM Posts WHERE PostID=" . $ID . ";");
						if ($row = mysqli_fetch_array($titleArray)) {
							return $row['PostTitle'];
						}
					}

					function timeStamp($ID) {
						$con = mysqli_connect(localhost, 'sara_tang', 'canada4ever', 'Blog');
						$dateArray = mysqli_query($con, "SELECT * FROM Posts WHERE PostID=" . $ID . ";");
						if ($row = mysqli_fetch_array($dateArray)) {
							return $row['PostDate'];
						}
					}
					function formatDate() {
						
					}
					function content($ID) {
						$con = mysqli_connect(localhost, 'sara_tang', 'canada4ever', 'Blog');
						$contentArray = mysqli_query($con, "SELECT * FROM Posts WHERE PostID=" . $ID . ";");
						if ($row = mysqli_fetch_array($contentArray)) {
							return $row["PostContent"];
						}
 					};
 				?>

				<div class="blog_post" id="post3">
					<div class="post_title"><a href='posts/post3.php'>
						<?php
						echo title(3);
						?>
					</a></div>
					<div class="post_content">
						<p><?php
						echo timeStamp(3);
						?></p>
						<p><?php
						echo content(3);
						?></p>
					</div>
				</div>
				<div class="blog_post" id="post2">
					<div class="post_title"><a href='posts/post2.php'>
						<?php
						echo title(2);
						?>
					</a></div>
					<div class="post_content">
						<p><?php
						echo timeStamp(2);
						?></p>
						<p><?php
						echo content(2);
						?></p>
					</div>
				</div>
				<div class="blog_post" id="post1">
					<div class="post_title"><a href='posts/post1.php'>
						<?php
						echo title(1);
						?>
					</a></div>
					<div class="post_content">
						<p><?php
						echo timeStamp(1);
						?></p>
						<p><?php
						echo content(1);
						?></p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>