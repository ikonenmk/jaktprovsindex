<?php

	//Till�t anslutning fr�n samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	//Skapa anslutning till databas
	$servername = "127.0.0.1";//"atlas.dsv.su.se";
	$username = "root";//"usr_21321852";
	$password = "#MyS4KOisaT1KK4";//"321852";
	$db_name = "db_21321852";
	$conn = new mysqli($servername, $username, $password, $db_name);
	
	//Kontrollera om anslutningen uppr�ttats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	//Funktion f�r att returnera medeltal f�r samtliga prov
	
	//Prepared statement
	if($stmt = $conn->prepare("SELECT * FROM prov")) {

		//Genomf�r statement
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
		$medelSkall = $summaSkall / $antalProv;
		
		$medeltal = array('medelSok' => $medelSok, 'medelSkall' => $medelSkall);
	

		header('Content-type: application/json');
		echo json_encode($medeltal);
		
	}

?>