<?php

	//Tillåt anslutning från samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	//Skapa anslutning till databas
	$servername = "atlas.dsv.su.se";
	$username = "usr_21321852";
	$password = "321852";
	$db_name = "db_21321852";
	$conn = new mysqli($servername, $username, $password, $db_name);

	//Kontrollera om anslutningen upprättats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	//Hämta alla prov
	//Prepared statement
	if($stmt = $conn->prepare("SELECT * FROM prov")) {

		//Genomför statement
		$stmt->execute();
		
		$stmt->bind_result($sok, $skall, $datum, $id, $hund_regnr);

		//Skapa medeltal
		$summaSok = 0;
		$summaSkall = 0;
		$antalProv = 0;
		while ($stmt->fetch()) {
			$summaSok += $sok;
			$summaSkall += $skall;
			$antalProv++;
		}

		$medelSok = $summaSok / $antalProv;

		echo $medelSok;
		
	}

?>