<?php

	//Tillåt anslutning från samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	$_POST = json_decode(file_get_contents("php://input"),true);
	$hundras = $_POST['ras'];

		//Skapa anslutning till databas
	$servername = "127.0.0.1";//"atlas.dsv.su.se";
	$username = "root";//"usr_21321852";
	$password = "#MyS4KOisaT1KK4";//"321852";
	$db_name = "db_21321852";

	$conn = new mysqli($servername, $username, $password, $db_name);
	//Kontrollera om anslutningen upprättats
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	//Prepared statement som skickas till db
	if($stmt = $conn->prepare("SELECT * FROM hundar WHERE ras=?")) {
		$stmt->bind_param("s", $hundras);
		//Genomför statement
		$stmt->execute();

		//bind resultat-variabler till prepared statement
		$stmt->bind_result($id, $hund_regnr, $namn, $fodelsedatum, $skall, $sok, $ras);

		//Lägg samtliga prov som json-objekt i array
		$responseArray = array();
		while ($stmt->fetch()) {
			$data = array("id" => $id, "hund_regnr" => $hund_regnr, "namn" => $namn, "fodelsedatum" => $fodelsedatum, "skall" => $skall, "sok" => $sok, "ras" => $ras);
			array_push($responseArray, $data);
		}
		//Returnera array med json objekt
		echo json_encode($responseArray);
		
	}
?>
