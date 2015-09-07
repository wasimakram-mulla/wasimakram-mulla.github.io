<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Photo Gallery</title>
  <link rel="stylesheet" href="../../css/bootstrap.min.css">  
  <link rel="stylesheet" href="../../css/bootstrap-theme.min.css">  
  <link rel="stylesheet" href="css/carousel.css" />
  <link rel="stylesheet" href="css/lightbox.css" />
  <link rel="stylesheet" href="css/style.css">
  
  <script src="../../js/Libs/jquery-1.11.1.min.js"></script>
  <script src="../../js/Libs/bootstrap.min.js"></script>
  <script src="../../js/Libs/jquery-ui.min.js"></script>
  <script src="../../js/Libs/lightbox.min.js"></script>
  <script src="js/Controllers/mainController.js"></script>
</head>
<body>
<!-- Carousel ================================================== -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="First slide">
          <div class="container">
            <div class="carousel-caption">
              <h1>Example headline.</h1>
              <p>Note: If you're viewing this page via a <code>file://</code> URL, the "next" and "previous" Glyphicon buttons on the left and right might not load/display properly due to web browser security rules.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAGZmZgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Second slide">
          <div class="container">
            <div class="carousel-caption">
              <h1>Another example headline.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAFVVVQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Third slide">
          <div class="container">
            <div class="carousel-caption">
              <h1>One more for good measure.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
            </div>
          </div>
        </div>
      </div>
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div><!-- /.carousel -->
	
	<div class="col-md-12">
		<div class="col-md-3 galPic">
			<a href="img/img1.jpg" data-lightbox="image-1" data-title="Album 1 Img 1"><img src="img/img1_invert.jpg" data-origImg="img/img1.jpg" class="featurette-image img-responsive" /></a>
			<h4>Album 1</h4>
		</div>
		<div class="col-md-3 galPic">
			<a href="img/img2.jpg" data-lightbox="image-1" data-title="Album 2 Img 1"><img src="img/img2_invert.jpg" data-origImg="img/img2.jpg" class="featurette-image img-responsive" /></a>
			<h4>Album 2</h4>
		</div>
		<div class="col-md-3 galPic">
			<a href="img/img3.jpg" data-lightbox="image-1" data-title="Album 3 Img 1"><img src="img/img3_invert.jpg" data-origImg="img/img3.jpg" class="featurette-image img-responsive" /></a>
			<h4>Album 3</h4>
		</div>
		<div class="col-md-3 galPic">
			<a href="img/img4.jpg" data-lightbox="image-1" data-title="Album 4 Img 1"><img src="img/img4_invert.jpg" data-origImg="img/img4.jpg" class="featurette-image img-responsive" /></a>
			<h4>Album 4</h4>
		</div>
	</div>
	<div class="col-md-12">
		<div class="col-md-3 galPic">
			<a href="img/img5.jpg" data-lightbox="image-1" data-title="Album 5 Img 1"><img src="img/img5_invert.jpg" data-origImg="img/img5.jpg" class="featurette-image img-responsive" /></a>
			<h4>Album 5</h4>
		</div>
	</div>
</body>
</html>