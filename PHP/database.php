<?php
//Databaskoppling som krävs i övriga filer som hanterar databas data
	$servername = "127.0.0.1";
	$username = "root";
	$password = "#MyS4KOisaT1KK4";
	$db_name = "db_21321852";

	$conn = new mysqli($servername, $username, $password, $db_name);
	
	//Kontrollera om anslutningen upprättats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
?>