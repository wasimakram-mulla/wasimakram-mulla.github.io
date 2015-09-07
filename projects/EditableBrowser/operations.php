<?php
	
	$action= $_GET['action'];
	
	if($action=='contentEdit')
	{
		echo "This is Edited content: -   ".$_POST['editedContent'];
	}
	
?>