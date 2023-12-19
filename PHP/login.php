<?php
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	
	require_once("database.php");

	$_POST = json_decode(file_get_contents("php://input"),true);
	$posted_username = $_POST['username'];
	$posted_password = $_POST['password'];
	$hashed_password = password_hash($posted_password, PASSWORD_DEFAULT);

	
	//Hämta kolumner username och role från tabellen users som uppfyller villkor för username
	if ($stmt = $conn->prepare("SELECT username, password, role FROM users WHERE username = ?")) {


		//Bind parametrar
		$stmt->bind_param("s", $posted_username);
		//Genomför statement
		$stmt->execute();
		$stmt->store_result(); // Store the result to check the number of rows.
		if ($stmt->num_rows > 0) {
			$stmt->bind_result($username,$hashed_password, $role);
			 $stmt->fetch(); // Fetch the data from the result.
			
			if (password_verify($posted_password, $hashed_password)) { //Check if password is correct
			$userArray = array('username' => $username, 'role' => $role);

		

			//Skapa en kaka som lagrar inloggning (används för check i frontend)
			$cookie_name = "jaktprovsindex";
			$cookie_value = true;
			setcookie($cookie_name, $cookie_value, time() + 1800, "/", "", false);


			header('Content-type: application/json');
			echo json_encode($userArray);

		} else {
			// Password is incorrect
			echo "Username or password is wrong";
		}
	} else {
		// User does not exist
		echo "Username or password is wrong";
	}
	$stmt->close();
	}
		
?>