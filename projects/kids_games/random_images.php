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
    <link href="css/random_images.css" rel="stylesheet">
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
				<li class="active"><a href="random_images.php">Random Images</a></li>
				<li><a href="phonics.php">Phonics</a></li>
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
		<h2>Select first alphabet of the Fruit</h2>
		<div class="col-sm-6">
			<img id="imageTab" class="imageTab" width="70%"/>
		</div>
		<div class="col-sm-6">
			<div id="option1" class="col-sm-6 option"><h4 class="img-circle"><img width="100" height="100"/></h4></div>
			<div id="option2" class="col-sm-6 option"><h4 class="img-circle"><img width="100" height="100"/></h4></div>
			<div id="option3" class="col-sm-6 option"><h4 class="img-circle"><img width="100" height="100"/></h4></div>
			<div id="option4" class="col-sm-6 option"><h4 class="img-circle"><img width="100" height="100"/></h4></div>
		</div>
	</div>
	<div class="col-sm-12">
		<div class="col-sm-4">
			<button id="btn-next" type="button" class="btn btn-primary">Next</button>
		</div>
		<div class="col-sm-8">
			<label id="answerText"></label>
		</div>
	</div>
</div> <!-- /container -->
<audio id="correctAnswer" src="audio/correctAnswer.mp3"></audio>
<audio id="incorrectAnswer" src="audio/incorrectAnswer.wav"></audio>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../../js/Libs/jquery-1.11.1.min.js"></script>
    <script src="../../js/Libs/bootstrap.min.js"></script>
     <script src="js/Controller/random_images.js"></script>
</html>
