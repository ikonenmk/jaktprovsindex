<?php
//Tillåt alla origin och headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$regnr = "SE27828/2018";
$sok = 2;
$skall = 2;
$datum = "2023-08-29";

// Skapa anslutning
$servername = "atlas.dsv.su.se";
$username = "usr_21321852";
$password = "321852";
$db_name = "db_21321852";
$conn = new mysqli($servername, $username, $password, $db_name);

if($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

//Prepared statement för att skapa nytt provresultat
if($stmt = $conn->prepare("INSERT INTO prov (hund_regnr, sok, skall, datum) VALUES (?,?,?,?)")) {
	
	//Bind variabler till parametrar
	$stmt->bind_param("ssss", $regnr, $sok, $skall, $datum);

	//Genomför statement och stäng
	$stmt->execute();
	$stmt->close();


}

?>