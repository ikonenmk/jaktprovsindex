<?php
//Databaskoppling som krävs i övriga filer som hanterar databas data
	$servername = "*";
	$username = "*";
	$password = "*";
	$db_name = "*";

	$conn = new mysqli($servername, $username, $password, $db_name);
	
	//Kontrollera om anslutningen upprättats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
?>