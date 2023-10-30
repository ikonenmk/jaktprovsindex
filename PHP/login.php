<?php
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	
	require_once("database.php");

	$_POST = json_decode(file_get_contents("php://input"),true);
	$posted_username = $_POST['username'];
	$posted_password = $_POST['password'];
	
	//Hämta kolumner username och role från tabellen users som uppfyller villkor för username och password
	if($stmt = $conn->prepare("SELECT username, role FROM users WHERE username = ? AND password = ?")) {

		//Bind parametrar
		$stmt->bind_param("ss", $posted_username, $posted_password);
		//Genomför statement
		$stmt->execute();
		$stmt->store_result(); // Store the result to check the number of rows.
		if ($stmt->num_rows > 0) {
			$stmt->bind_result($username, $role);
			 $stmt->fetch(); // Fetch the data from the result.

			$userArray = array('username' => $username, 'role' => $role);

		

			//Skapa en kaka som lagrar inloggning (används för check i frontend)
			$cookie_name = "jaktprovsindex";
			$cookie_value = true;
			setcookie($cookie_name, $cookie_value, time() + 1800, "/", "", false);


			header('Content-type: application/json');
			echo json_encode($userArray);

		} else { //Om hund inte finns meddela frontend
			echo "Username or password is wrong";
		}
		$stmt->close();
		}
?>