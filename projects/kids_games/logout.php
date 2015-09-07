<?php 
	setcookie("username", "", time() - 3600);
	setcookie("firstname", "", time() - 3600);
	header("location:login.php");
?>