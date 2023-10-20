<?php

/** TODO:
	- kolla om prov f�r hund_regnr finns i db, om ja => uppdatera, om nej => skapa ny hund
*/
require_once("database.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
	

//Konvertera $_POST fr�n JSON string till php v�rden
$_POST = json_decode(file_get_contents("php://input"),true);

if(isset($_POST['hund_regnr'])) { //Kontrollera att POST-request skickats fr�n frontend
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
		//St�ng
		$stmt->close();

	}

	//L�gg till egenskaper i array provData
	$provData = array('sok' => $sok, 'skall' => $skall);
	//Variable f�r att uppdatera v�rden i hunddata
	$newAntal_prov = 0;
	$newSok = 0;
	$newSkall = 0;
	
	//H�mta nuvarande data fr�n specifik hund_regnr
	if ($stmt = $conn->prepare("SELECT sok, skall, prov_antal FROM hundar WHERE hund_regnr=?")) 
	{
		//Bind variabler till statement
		$stmt->bind_param("s", $hund_regnr);
		//Execute
		$stmt->execute();
		//Bind resultat till variabler
		$stmt->bind_result($prevSok, $prevSkall, $prevAntal_prov);
		//H�mta
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

		//Genomf�r statement och st�ng
		$stmt->execute();
		$stmt->close();


}
}

?>