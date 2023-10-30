<?php
	//Headers anpassade för att ta emot requests från localhost:3000 (och inkludera kakor)
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");

// Sätter cookiens expiration date till bakåt i tiden vilket i praktiken får resultat som att kakan tas bort
$cookie_name = "jaktprovsindex";
$cookie_value = true;
setcookie($cookie_name, $cookie_value, time() - 3600, "/", "", false);

?>