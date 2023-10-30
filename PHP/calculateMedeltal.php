<?php

	//Tillåt anslutning från samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	
	require_once("database.php");

	//Funktion för att returnera medeltal för samtliga prov
	
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
		$medelSkall = $summaSkall / $antalProv;
		
		$medeltal = array('medelSok' => $medelSok, 'medelSkall' => $medelSkall);
	

		header('Content-type: application/json');
		echo json_encode($medeltal);
		
	}

?>