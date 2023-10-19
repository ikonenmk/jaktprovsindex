<?php
	$servername = "127.0.0.1";//"atlas.dsv.su.se";
	$username = "root";//"usr_21321852";
	$password = "#MyS4KOisaT1KK4";//"321852";
	$db_name = "db_21321852";

	$conn = new mysqli($servername, $username, $password, $db_name);
	
	//Kontrollera om anslutningen upprättats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
?>