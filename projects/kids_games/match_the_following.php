<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Match The Following</title>

    <!-- Bootstrap core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">    <link href="../../css/bootstrap.min.css" rel="stylesheet">
    <link href="../../css/bootstrap-theme.min.css" rel="stylesheet">    <link href="../../css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="css/m_t_f.css" rel="stylesheet">
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
                <li class="active"><a href="match_the_following.php">Match the following</a></li>
				<li><a href="random_images.php">Random Images</a></li>
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
	<div class="row">
		<div class="col-sm-12"><h3>Match The Following</h3></div>
		<div class="col-sm-12">
			<div class="row">
				<div class="col-sm-6 words" data-fruitname="APPLE"><h4>APPLE</h4></div>
				<div class="col-sm-6 fruits" data-fruit="grapes"><img src="images/m_t_f/grapes.jpg" height="150" width="150"><input type="text" readonly></div>
			</div>
				
			<div class="row">
				<div class="col-sm-6 words" data-fruitname="GRAPES"><h4>GRAPES</h4></div>				
				<div class="col-sm-6 fruits" data-fruit="orange"><img src="images/m_t_f/orange.jpg" height="150" width="150"><input type="text" readonly></div>
			</div>
			
			<div class="row">
				<div class="col-sm-6 words" data-fruitname="ORANGE"><h4>orange</h4></div>				
				<div class="col-sm-6 fruits" data-fruit="apple"><img src="images/m_t_f/apple.jpg" height="150" width="150"><input type="text" readonly></div>
			</div>
			
			<div class="row">
				<div class="col-sm-6 words" data-fruitname="STRAWBERRY"><h4>strawberry</h4></div>
				<div class="col-sm-6 fruits" data-fruit="watermelon"><img src="images/m_t_f/watermelon.jpg" height="150" width="150"><input type="text" readonly></div>				
			</div>
			
			<div class="row">
				<div class="col-sm-6 words" data-fruitname="WATERMELON"><h4>watermelon</h4></div>
				<div class="col-sm-6 fruits" data-fruit="strawberry"><img src="images/m_t_f/strawberry.jpg" height="150" width="150"><input type="text" readonly></div>
			</div>
		</div>
		<button id="checkMTF" type="button" class="btn btn-success">Check</button>
		<button id="retryMTF" type="button" class="btn btn-warning">Retry</button>
	</div>
	<br/><br/><br/><br/>
</div> <!-- /container -->

<!-- /HTML5 Audio Players -->
<audio id="tickClick" src="audio/tick.mp3"></audio>
<audio id="ClickSound" src="audio/mouseClick.mp3"></audio>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../../js/Libs/jquery-1.11.1.min.js"></script>
    <script src="../../js/Libs/bootstrap.min.js"></script>
    <script src="../../js/Libs/jquery-ui.min.js"></script>
    <script src="js/Controller/m_t_f.js"></script>	
</html>
