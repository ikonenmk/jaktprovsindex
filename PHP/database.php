<?php
//Databaskoppling som kr�vs i �vriga filer som hanterar databas data
	$servername = "";
	$username = "";
	$password = "";
	$db_name = "";

	$conn = new mysqli($servername, $username, $password, $db_name);
	
	//Kontrollera om anslutningen uppr�ttats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
?>