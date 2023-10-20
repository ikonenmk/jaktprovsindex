<?php

/** TODO:
	- kolla om prov för hund_regnr finns i db, om ja => uppdatera, om nej => skapa ny hund
*/
require_once("database.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
	

//Konvertera $_POST från JSON string till php värden
$_POST = json_decode(file_get_contents("php://input"),true);

if(isset($_POST['hund_regnr'])) { //Kontrollera att POST-request skickats från frontend
	//variabler
	$datum = $_POST['datum'];
	$hund_regnr = $_POST['hund_regnr'];
	$skall = $_POST['skall'];
	$sok = $_POST['sok'];

	//Spara nytt prov till databas
	if($stmt = $conn->prepare("INSERT INTO prov (datum, hund_regnr, sok, skall) VALUES(?,?,?,?)"))
	{
		//Bind variabler till statement
		$stmt->bind_param("ssss", $datum, $hund_regnr, $sok, $skall);
		//Execute
		$stmt->execute();
		//Stäng
		$stmt->close();

	}

	//Lägg till egenskaper i array provData
	$provData = array('sok' => $sok, 'skall' => $skall);
	//Variable för att uppdatera värden i hunddata
	$newAntal_prov = 0;
	$newSok = 0;
	$newSkall = 0;
	
	//Hämta nuvarande data från specifik hund_regnr
	if ($stmt = $conn->prepare("SELECT sok, skall, prov_antal FROM hundar WHERE hund_regnr=?")) 
	{
		//Bind variabler till statement
		$stmt->bind_param("s", $hund_regnr);
		//Execute
		$stmt->execute();
		//Bind resultat till variabler
		$stmt->bind_result($prevSok, $prevSkall, $prevAntal_prov);
		//Hämta
		$stmt->fetch();

		$newAntal_prov = $prevAntal_prov + 1;
		$newSkall = $prevSkall + $skall;
		$newSok = $prevSok + $sok;

		$stmt->close();
		
	} else {
		echo "Error";
	}

	//Uppdatera hunddata
	if($stmt = $conn->prepare("UPDATE hundar SET sok = ?, skall = ? WHERE hund_regnr = ?")) {
	
		//Bind variabler till parametrar
		$stmt->bind_param("sss", $newSok, $newSkall, $hund_regnr);

		//Genomför statement och stäng
		$stmt->execute();
		$stmt->close();


}
}

?>