<?php
//API för att kolla om hund finns i databasen (krävs för validering vid inmatning av nytt resultat)
	//Kontrollera om tidigare prov finns registrerat för hund_regnr
	$stmt = $conn->prepare("SELECT * FROM hundar WHERE hund_regnr = ?");
	$stmt->bind.param("s", $hund_regnr);
	$stmt->execute();
	$query_result = $stmt->get_result();
	
	if ($query_result->num_rows > 0) { //Om hund finns meddela frontend

	} else { //Om hund inte finns meddela frontend

	}
	$stmt->close();
?>