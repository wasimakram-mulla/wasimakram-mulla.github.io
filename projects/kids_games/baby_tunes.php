<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Static Top Navbar Example for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">
    <link href="../../css/bootstrap-theme.min.css" rel="stylesheet">
	<link href="css/custom.css" rel="stylesheet" />
    <link href="css/baby_tunes.css" rel="stylesheet">
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
				<li><a href="phonics.php">Phonics</a></li>
				<li class="active"><a href="baby_tunes.php">Baby Song</a></li>
              </ul>
            </li>
			<li><a href="logout.php">Logout</a></li>
          </ul>         
        </div><!--/.nav-collapse -->
      </div>
    </nav>


	<div class="container-fluid wallCnt">
		<div class="container wallBg">
			<div id="playBtn" class="playBtn"></div>
			<div id="stopBtn" class="stopBtn"></div>
			<div class="storyCnt">
				<div id="tinBox" class="col-lg-4 col-md-4 col-sm-4 col-xs-4 tinBox"><img src="images/baby_tunes/tinBox.png"/></div>
				<div id="girlCnt" class="col-lg-4 col-md-4 col-sm-4 col-xs-4 girlCnt"><img src="images/baby_tunes/empty.png">
				</div>
				<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 drumCnt">
				<img id="drum" src="images/baby_tunes/drum.png"/>
					<div id="pin" class="pin"></div>
					<div id="nib" class="nib"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid grassCnt"></div> <!-- /container -->
	<div id="audioText" class="col-lg-12 audioText"><br/><h3>She is a kid.</h3></div>
<audio id="audioPlayer" src="audio/A-Zphonics.mp3"></audio>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../../js/Libs/jquery-1.11.1.min.js"></script>
    <script src="../../js/Libs/bootstrap.min.js"></script>
    <script src="js/Controller/baby_tunes.js"></script>
</html>
