<?php

	//Tillåt anslutning från samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	
	$_POST = json_decode(file_get_contents("php://input"),true);

	//Skapa array med tillåtna värden egenskap kan ta
	$allowed_values = array('sok', 'skall');
	//Egenskapsvariabel
	$egenskaper = $_POST['egenskaper'];
	//Hund-ID variabel
	$hundId = $_POST['hundId'];
	//Variabel med totalvärde som returneras till frontend
	$totalValue = 0;

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

	//Kontrollera att egenskaper är en array, därefter hämta värden för respektive egenskap och addera medelvärde till totalvärde
	if(is_array($egenskaper)) {
		foreach ($egenskaper as $egenskap) {

	//Kontrollera att egenskap är tillåtet värde
	if (in_array($egenskap, $allowed_values)) {
	//Prepared statement
	if($stmt = $conn->prepare("SELECT $egenskap FROM hundar WHERE hund_regnr=?")) {
		//Bind parametrar
		$stmt->bind_param("s", $hundId);
		//Genomför statement
		$stmt->execute();
		//Bind resultat
		$stmt->bind_result($egenskap);

		//Skapa medeltal för egenskap
		$egenskapSumma = 0;
		$antalProv = 0;
		while ($stmt->fetch()) {
			$egenskapSumma += $egenskap;
			$antalProv++;
		}
		//Addera till totalvärde
		$totalValue += $egenskapSumma / $antalProv;
	
		}

	} else {
		echo "bad value";
	}
		}
	} else {
		echo "Sent data is not an array";
	}
	
		//Returnera total värde som json objekt
		$medeltal = array('average' => $totalValue);
		header('Content-type: application/json');
		echo json_encode($medeltal);

	

?>