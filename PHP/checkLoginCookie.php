<?php
	//Tillåt origin localhost:3000 och headers med credentials (för att möjliggöra kakor)
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Credentials: true");

	//Kontrollera att cookien är satt och skriv ut värdet
	$cookie_name = "jaktprovsindex";
	if (isset($_COOKIE[$cookie_name])) {
		echo $_COOKIE[$cookie_name];
	} else {
		echo "The cookie '$cookie_name' is not set!";
	}
	
?>