import React, { useEffect, useState } from "react";
import axios from "axios";

function AddResult() {
    /** Use state för formulärdata */
    const [formData, setFormData] = useState({
        namn: "",
        hund_regnr: "",
        sok: "",
        skall: "",
        datum: "",
    });

    // Hantera förändring av data
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hantera submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // Skicka request till server.php för att hämta data baserat på input
        axios
            .post("http://localhost:8000/addResult.php", formData)
            .then((response) => {
                console.log(response.data); //Uppdatera rad-data med array med JSON-objekt från server
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <label htmlFor="namn">Hundnamn:</label>
                    <input
                        type="text"
                        name="namn"
                        value={formData.namn}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="datum">Datum:</label>
                    <input
                        type="text"
                        name="datum"
                        value={formData.datum}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="hund_regnr">Hundens regnr:</label>
                    <input
                        type="text"
                        name="hund_regnr"
                        value={formData.hund_regnr}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="skall">Skall:</label>
                    <input
                        type="text"
                        name="skall"
                        value={formData.skall}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="sok">Sok:</label>
                    <input
                        type="text"
                        name="sok"
                        value={formData.sok}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        
        </>

    );
};


export default AddResult;