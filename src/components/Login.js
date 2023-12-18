import React, { useEffect, useState } from "react";
import axios from "axios";

//Login komponent 
function Login({ handleLogin }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");

    //Hantera submit och kontrollera användarnman och lösenord, sätt felmeddelande om fel
    function handleSubmit() {
        console.log("handlesSubmit");
        console.log(formData); 
        axios
            .post("http://localhost:8000/login.php", formData, { withCredentials: true })
            .then((response) => {
                if (typeof response.data === 'object') {
                    console.log("Object");
                    const newLoginData = 1;
                    handleLogin(newLoginData);
                    const newErrorMsg = "Inloggad som : " + response.data.username;
                    setErrorMsg(newErrorMsg);
                } else {
                    console.log("Wrong username or password");
                    const newErrorMsg = "Felaktigt användarnamn eller lösenord";
                    const newLoginData = 0;
                    handleLogin(newLoginData);
                    setErrorMsg(newErrorMsg);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleInput = (e) => {
        const updatedFormData = { ...formData };
        updatedFormData[e.target.name] = e.target.value;
        setFormData(updatedFormData);
    }
    return (
        <>
            <form>
                 <p>Användarnamn:</p>
                <input type="text" name="username" onChange={ handleInput }></input>
                 <p>Lösenord:</p>
                <input type="password   " name="password" onChange={ handleInput }></input>
                 <button onClick={handleSubmit}>Logga in</button>
            </form>
                { errorMsg && <div>{errorMsg}</div> }
        </>
    )
}
export default Login;