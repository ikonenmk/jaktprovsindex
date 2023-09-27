<?php
	//Till�t anslutning fr�n samtliga
	header("Access-Control-Allow-Origin: *");

	//S�tt regnr till input
	$regnr = $_POST['name'];
		//Skapa anslutning till databas
	$servername = "atlas.dsv.su.se";
	$username = "usr_21321852";
	$password = "321852";
	$db_name = "db_21321852";
	$conn = new mysqli($servername, $username, $password, $db_name);

	//Kontrollera om anslutningen uppr�ttats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	//Prepared statement som skickas till db
	if($stmt = $conn->prepare("SELECT sok, skall FROM prov WHERE hund_regnr=?")) {
		//Bind input som parameter
		$stmt->bind_param("s",$regnr);
		//Genomf�r statement
		$stmt->execute();

		//bind resultat-variabler till prepared statement
		$stmt->bind_result($sok, $skall);

		//h�mta variabler och skriv ut
		while ($stmt->fetch()) {
			printf("S�k: %s Skall: %s\n", $sok, $skall);
		}
		
	}
?>
