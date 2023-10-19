<?php
	require_once("database.php");
	//Till�t anslutning fr�n samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	
	//Konvertera $_POST fr�n JSON string till php v�rden
	$_POST = json_decode(file_get_contents("php://input"),true);

	//s�tt regnr och namn till input
	$regnr = $_POST['regnr'];
	$namn = $_POST['namn'];
	//$regnr = "SE27828/2018";//$_POST['regnr'];
	$namn = "test";//$_POST['namn'];

	//Prepared statement som skickas till db
	if($stmt = $conn->prepare("SELECT id, sok, skall, datum FROM prov WHERE hund_regnr=?")) {
		//Bind input som parameter
		$stmt->bind_param("s",$regnr);
		//Genomf�r statement
		$stmt->execute();

		//bind resultat-variabler till prepared statement
		$stmt->bind_result($id, $sok, $skall, $datum);

		//L�gg samtliga prov som json-objekt i array
		$responseArray = array();
		while ($stmt->fetch()) {
			$data = array("id" => $id, "sok" => $sok, "skall" => $skall, "datum" => $datum);
			array_push($responseArray, $data);
		}
		//Returnera array med json objekt
		echo json_encode($responseArray);
		
	}
?>
