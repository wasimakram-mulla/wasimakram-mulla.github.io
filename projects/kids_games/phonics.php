<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Phonics</title>

    <!-- Bootstrap core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">
    <link href="../../css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="css/phonics.css" rel="stylesheet">
	<link href="css/custom.css" rel="stylesheet" />
  </head>

  <body>

    <!-- Static navbar -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Demo App</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse navbar-right">
          <ul class="nav navbar-nav">
			<li><a class="text-primary" href="#"><?php if(isset($_COOKIE['firstname'])) { echo 'Welcome '.$_COOKIE['firstname']; } ?></a></li>
            <li><a href="index.php">Home</a></li>
            <li class="dropdown active">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Games <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="missing_alphabet.php">Fill In the Blanks</a></li>
				<li><a href="match_the_following.php">Match the following</a></li>
				<li><a href="random_images.php">Random Images</a></li>
				<li class="active"><a href="phonics.php">Phonics</a></li>
				<li><a href="baby_tunes.php">Baby Song</a></li>
              </ul>
            </li>
			<li><a href="logout.php">Logout</a></li>
          </ul>         
        </div><!--/.nav-collapse -->
      </div>
    </nav>


<div class="container mainWrapper">
	<div class="col-sm-12">
		<h2>Click on the Word to See and Listen the Phonic</h2>		
		<div class="col-sm-1 alphabets"><div id="charImgs0"  class="charImgs A"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs1"  class="charImgs B"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs2"  class="charImgs C"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs3"  class="charImgs D"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs4"  class="charImgs E" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs5"  class="charImgs F" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs6"  class="charImgs G" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs7"  class="charImgs H" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs8"  class="charImgs I" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs9" class="charImgs J" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs10" class="charImgs K" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs11" class="charImgs L" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs12" class="charImgs M" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs13" class="charImgs N" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs14" class="charImgs O" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs15" class="charImgs P" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs16" class="charImgs Q" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs17" class="charImgs R" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs18" class="charImgs S" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs19" class="charImgs T" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs20" class="charImgs U" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs21" class="charImgs V" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs22" class="charImgs W" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs23" class="charImgs X" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs24" class="charImgs Y" data-disabled="disabled"></div></div>
		<div class="col-sm-1 alphabets"><div id="charImgs25" class="charImgs Z" data-disabled="disabled"></div></div>
	</div>	
	<div class="col-sm-12 imageContainer">
		<img id="mainImg" height="200" width="200"/>
		<h3 id="charText"></h3>
	</div>
</div> <!-- /container -->
<audio id="phonicsAudio" src="audio/A-Zphonics.mp3"></audio>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../../js/Libs/jquery-1.11.1.min.js"></script>
    <script src="../../js/Libs/bootstrap.min.js"></script>
    <script src="js/Controller/phonics.js"></script>
</html>
