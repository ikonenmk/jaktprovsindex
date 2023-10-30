<?php
	require_once("database.php");
	//Tillåt anslutning från samtliga med headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");

	//Hämta all data från tabellen hundar i databasen
	if($stmt = $conn->prepare("SELECT * FROM hundar")) {
		//Genomför statement
		$stmt->execute();

		//bind resultat-variabler till prepared statement
		$stmt->bind_result($id_hundar, $hund_regnr, $namn,$fodelsedatum, $skall, $sok, $ras, $prov_antal, $upptagsarbete, $vackning_pa_slag, $drevarbete, $vackning_pa_tappt, $skall_horbarhet, $skall_under_drev, $samarbete, $lydnad );

		//Lägg samtliga prov som json-objekt i array
		$responseArray = array();
		while ($stmt->fetch()) {
			$data = array("id" => $id_hundar, "hund_regnr" => $hund_regnr, "namn" => $namn, "fodelsedatum" => $fodelsedatum, "skall" => $skall, "sok" => $sok, "ras" => $ras, "antalProv" => $prov_antal, "upptagsarbete" => $upptagsarbete, "vackning_pa_slag" => $vackning_pa_slag, "drevarbete" => $drevarbete, "vackning_pa_tappt" => $vackning_pa_tappt, "skall_horbarhet" => $skall_horbarhet, "skall_under_drev" => $skall_under_drev, "samarbete" => $samarbete, "lydnad" => $lydnad);
			array_push($responseArray, $data);
		}
		//Returnera array med json objekt
		echo json_encode($responseArray);
		
	}
?>
