<?php
	require_once("database.php");

	//Till�t anslutning fr�n samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	
	$_POST = json_decode(file_get_contents("php://input"),true);

	//Skapa array med till�tna v�rden egenskap kan ta
	$allowed_values = array('sok', 'skall');
	//Egenskapsvariabel
	$egenskaper = $_POST['egenskaper'];
	//Hund-ID variabel
	$hundId = $_POST['hundId'];
	//Variabel med totalv�rde som returneras till frontend
	$totalValue = 0;

	//Kontrollera att egenskaper �r en array, d�refter h�mta v�rden f�r respektive egenskap och addera medelv�rde till totalv�rde
	if(is_array($egenskaper)) {
		foreach ($egenskaper as $egenskap) {

	//Kontrollera att egenskap �r till�tet v�rde
	if (in_array($egenskap, $allowed_values)) {
	//Prepared statement
	if($stmt = $conn->prepare("SELECT $egenskap FROM hundar WHERE hund_regnr=?")) {
		//Bind parametrar
		$stmt->bind_param("s", $hundId);
		//Genomf�r statement
		$stmt->execute();
		//Bind resultat
		$stmt->bind_result($egenskap);

		//Skapa medeltal f�r egenskap
		$egenskapSumma = 0;
		$antalProv = 0;
		while ($stmt->fetch()) {
			$egenskapSumma += $egenskap;
			$antalProv++;
		}
		//Addera till totalv�rde
		$totalValue += $egenskapSumma / $antalProv;
	
		}

	} else {
		echo "bad value";
	}
		}
	} else {
		echo "Sent data is not an array";
	}
	
		//Returnera total v�rde som json objekt
		$medeltal = array('average' => $totalValue);
		header('Content-type: application/json');
		echo json_encode($medeltal);

	

?>