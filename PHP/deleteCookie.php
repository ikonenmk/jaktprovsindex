<?php
	//Headers anpassade f�r att ta emot requests fr�n localhost:3000 (och inkludera kakor)
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");

// S�tter cookiens expiration date till bak�t i tiden vilket i praktiken f�r resultat som att kakan tas bort
$cookie_name = "jaktprovsindex";
$cookie_value = true;
setcookie($cookie_name, $cookie_value, time() - 3600, "/", "", false);

?>