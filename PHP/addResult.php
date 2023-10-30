<?php
require_once("database.php");
//Tillåt anslutning från samtliga med headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//Konvertera $_POST från JSON string till php värden
$_POST = json_decode(file_get_contents("php://input"),true);

/** Spara nytt prov i databasen*/
	if(isset($_POST['hund_regnr'])) { //Kontrollera att POST-request skickats från frontend
		$sok = $_POST['sok'];
		$datum = $_POST['datum'];
		$hund_regnr = $_POST['hund_regnr'];
		$skall = $_POST['skall'];
		$upptagsarbete = $_POST['upptagsarbete'];
		$vackning_pa_slag = $_POST['vackning_pa_slag'];
		$drevarbete = $_POST['drevarbete'];
		$vackning_pa_tappt = $_POST['vackning_pa_tappt'];
		$skall_horbarhet = $_POST['skall_horbarhet'];
		$skall_under_drev = $_POST['skall_under_drev'];
		$samarbete = $_POST['samarbete'];
		$lydnad = $_POST['lydnad'];


	if($stmt = $conn->prepare("INSERT INTO prov (datum, hund_regnr, sok, skall, upptagsarbete, vackning_pa_slag, drevarbete, vackning_pa_tappt, skall_horbarhet, skall_under_drev, samarbete, lydnad) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"))
	{
		//Bind variabler till statement och genomför
		$stmt->bind_param("ssssssssssss", $datum, $hund_regnr, $sok, $skall, $upptagsarbete, $vackning_pa_slag, $drevarbete, $vackning_pa_tappt, $skall_horbarhet, $skall_under_drev, $samarbete, $lydnad);
		$stmt->execute();
		//Stäng
		$stmt->close();

	}
	
/** Uppdatera egenskapsdata för hund i databasen*/

	//Lägg till egenskaper i array provData
	$provData = array('sok', 'skall', 'upptagsarbete', 'vackning_pa_slag', 'drevarbete', 'vackning_pa_tappt', 'skall_horbarhet', 'skall_under_drev', 'samarbete', 'lydnad');
	
	//Hämta nuvarande data från specifik hund_regnr
	if ($stmt = $conn->prepare("SELECT prov_antal, " . implode(", ", $provData) . " FROM hundar WHERE hund_regnr=?")) 
	{
		//Bind parameter regnr och genomför statement
		$stmt->bind_param("s", $hund_regnr);
		$stmt->execute();

    // Bind resultvariabler till samma som provData
		$stmt->bind_result(
			$prevAntal_prov,
			$prevSok,
			$prevSkall,
			$prevUpptagsarbete,
			$prevVackning_pa_slag,
			$prevDrevarbete,
			$prevVackning_pa_tappt,
			$prevSkall_horbarhet,
			$prevSkall_under_drev,
			$prevSamarbete,
			$prevLydnad
		);
		 $stmt->fetch();

   //Uppdaterade värden för hund i databas
		$newAntal_prov = $prevAntal_prov + 1;
		$newSkall = $prevSkall + $skall;
		$newSok = $prevSok + $sok;
        $newUpptagsarbete = $prevUpptagsarbete + $upptagsarbete;
		$newVackning_pa_slag = $prevVackning_pa_slag + $vackning_pa_slag;
        $newDrevarbete = $prevDrevarbete + $drevarbete;
        $newVackning_pa_tappt = $prevVackning_pa_tappt + $vackning_pa_tappt;
		$newSkall_horbarhet = $prevSkall_horbarhet + $skall_horbarhet; 
        $newSkall_under_drev = $prevSkall_under_drev + $skall_under_drev;
        $newSamarbete = $prevSamarbete + $samarbete;
		$newLydnad = $prevLydnad + $lydnad;

    // Close the prepared statement
    $stmt->close();
	} else {
		echo "Prepared statement preparation failed: " . $mysqli->error;
	}

	//Kombinera arrayer för att slippa skriva ut alla värden i statement
	$queryData = [];
	for ($i = 0; $i < count($provData); $i++) {
		$queryData[] = $provData[$i] . " = ?";
	}
		//Uppdatera egenskapsdata för hund i databasen
		if($stmt = $conn->prepare("UPDATE hundar SET prov_antal = ?, " . implode(", ", $queryData) . " WHERE hund_regnr = ?")) {
	
			//Bind variabler och genomför
			$stmt->bind_param("ssssssssssss", $newAntal_prov, $newSok, $newSkall, $newUpptagsarbete, $newVackning_pa_slag, $newDrevarbete, $newVackning_pa_tappt, $newSkall_horbarhet, $newSkall_under_drev, $newSamarbete, $newLydnad, $hund_regnr);
			//Genomför statement och stäng
			$stmt->execute();
			//Stäng statement
			$stmt->close();
	} 
	} else {
		echo "Error with update";
	}
?>