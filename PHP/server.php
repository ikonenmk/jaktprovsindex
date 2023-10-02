<?php
	//Tillåt anslutning från samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	
	//Konvertera $_POST från JSON string till php värden
	$_POST = json_decode(file_get_contents("php://input"),true);

	//sätt regnr och namn till input
	$regnr = $_POST['regnr'];
	$namn = $_POST['namn'];
	//$regnr = "SE27828/2018";//$_POST['regnr'];
	$namn = "test";//$_POST['namn'];
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

	//Prepared statement som skickas till db
	if($stmt = $conn->prepare("SELECT id, sok, skall, datum FROM prov WHERE hund_regnr=?")) {
		//Bind input som parameter
		$stmt->bind_param("s",$regnr);
		//Genomför statement
		$stmt->execute();

		//bind resultat-variabler till prepared statement
		$stmt->bind_result($id, $sok, $skall, $datum);

		//Lägg samtliga prov som json-objekt i array
		$responseArray = array();
		while ($stmt->fetch()) {
			$data = array("id" => $id, "sok" => $sok, "skall" => $skall, "datum" => $datum);
			array_push($responseArray, $data);
		}
		//Returnera array med json objekt
		echo json_encode($responseArray);
		
	}
?>
