<?php
	//Till�t origin localhost:3000 och headers med credentials (f�r att m�jligg�ra kakor)
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Credentials: true");

	//Kontrollera att cookien �r satt och skriv ut v�rdet
	$cookie_name = "jaktprovsindex";
	if (isset($_COOKIE[$cookie_name])) {
		echo $_COOKIE[$cookie_name];
	} else {
		echo "The cookie '$cookie_name' is not set!";
	}
	
?>