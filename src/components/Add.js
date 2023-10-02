import React from 'react';
import axios from "axios";

function Add() {

    const handleSubmit = (event) => {
        event.preventDefault();

        // Skicka request till server.php för att hämta data baserat på input
        axios
            .post("http://localhost:8000/add.php")
            .then((response) => {
                console.log(response); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return <div>
        <button onClick={handleSubmit}>Add</button>
    </div>
}
export default Add;