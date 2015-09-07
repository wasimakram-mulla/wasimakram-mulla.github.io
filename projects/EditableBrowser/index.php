<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Live Content Editable</title>

    <!-- Bootstrap core CSS -->
    <link href="css/jquery-ui.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
  </head>
<body>
<h2>Demo for Editable Content on Browser</h2>
<form action="operations.php?action=contentEdit" method="post">
	<div class="wrapper">
		<div class="textContent">
			TEST
		</div>
		<input type="hidden" name="editedContent" class="editedContent"/>
		<button class="editText btn btn-link" type="button">Edit</button>
		<button class="cancelBtn btn btn-link" type="button">Cancel</button>
		<button class="submitBtn btn btn-success btn-sm" type="submit">Save</button>
	</div>
</form>

<form action="operations.php?action=contentEdit" method="post">
	<div class="wrapper">
		<div class="textContent">
			New TEST
		</div>
		<input type="hidden" name="editedContent" class="editedContent"/>
		<button class="editText btn btn-link" type="button">Edit</button>
		<button class="cancelBtn btn btn-link" type="button">Cancel</button>
		<button class="submitBtn btn btn-success btn-sm" type="submit">Save</button>
	</div>
</form><br/>
<strong>Note: Above content is send and reverted from Server</strong>
<!-- Libs & Controllers -->
<script src="../../js/Libs/jquery-1.11.1.min.js"></script> 
<script src="../../js/Libs/jquery-ui.min.js"></script> 
<script src="../../js/Libs/bootstrap.min.js"></script>
<script src="js/Controller/mainController.js"></script>
</body>
</html>