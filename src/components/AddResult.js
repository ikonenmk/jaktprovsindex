import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AutocompleteInputField from './AutocompleteInputField';
import Button from 'react-bootstrap/Button';

//Gränssnitt för att ladda upp ett nytt resultat i databasen
function AddResult() {


    //Use state för formulärdata 
    const [formData, setFormData] = useState({
        namn: "",
        hund_regnr: "",
        sok: "",
        skall: "",
        datum: "",
        upptagsarbete: "",
        vackning_pa_slag: "",
        drevarbete: "",
        vackning_pa_tappt: "",
        skall_horbarhet: "",
        skall_under_drev: "",
        samarbete: "",
        lydnad: "",
    });

    //Use state för meddelanden
    const [dateErrorMsg, setDateErrorMsg] = useState("");
    const [propertyErrorMsg, setPropertyErrorMsg] = useState();
    const [saved, setSaved] = useState(false);

    //Hantera validering av datum
    const isValidDate = (dateInput) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (!regex.test(dateInput)) {
            return false;
        }

        //Skapa ett dateObject och kontrollera om det är giltigt
        const dateObject = new Date(dateInput);
        if (isNaN(dateObject.getTime())) {
            return false;
        }

        return true;
    };

    // Hantera submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        //Validera input

        //ta bort värden som ej ska kontrolleras
        const propertiesToRemove = ['hund_regnr', 'namn', 'datum']; 
        const updatedList = { ...formData };
        for (const propertyToRemove of propertiesToRemove) {
            delete updatedList[propertyToRemove];
        }

        //Nytt objekt för som håller uppdaterade felmeddelande states
        const updatedState = {};

        updatedState.propertyError = {};
        for (const key in updatedList) {
            const value = parseFloat(updatedList[key]);
            if (isNaN(value)) {
                updatedState.propertyError[key] = false;
            } else {
                updatedState.propertyError[key] = true;
            }
        }
        
        //datum (måste vara date YYYY-MM-DD) 
        updatedState.newDateError = !isValidDate(formData.datum);
        if (updatedState.newDateError) {
            setDateErrorMsg("Datum måste skrivas i formatet YYYY-DD-MM");
        } else {
            setDateErrorMsg("");
        }
        //egenskaper (måste vara siffror)
        if (Object.values(updatedState.propertyError).includes(false)) {
            setPropertyErrorMsg("Egenskapspoäng får bara skrivas med siffror");
        } else {
            setPropertyErrorMsg("");
        }

        if (!Object.values(updatedState.propertyError).includes(false) && !updatedState.newDateError) {
            // Skicka request till server för att hämta data baserat på input
            axios
                .post("http://localhost:8000/addResult.php", formData)
                .then((response) => {
                    console.log(response); 
                    setSaved(true);
                })
                .catch((error) => {
                    console.log(error);
                }); 
        } else {
            return;
        }
    };

    //Hantera ändring av input för att uppdatera visning direkt
    const handleNewInput = (newData) => {
        console.log("handleNewInput fired!")
        setFormData(newData[0]);
    };

    //Hantera klick på Lägg till nytt prov
    const handleNextProv = () => {
        setSaved(false);
        window.location.reload();
    }

    return (
        <>
            <div class="container">

            <form onSubmit={handleSubmit} method="POST">
                <div class="inputField">
                    <AutocompleteInputField handleNewInput={handleNewInput} />

                </div>
                {dateErrorMsg && <div className="error">{dateErrorMsg}</div>}
                <div>
                </div>
                {propertyErrorMsg && <div className="error">{propertyErrorMsg}</div>}
                    <div class="saveProvButtonContainer">
                        {!saved &&
                            <Button variant="secondary" size="small" onClick={handleSubmit}> Spara prov </Button>
                        }
                        {saved &&
                            <Button variant="success" size="small" onClick={handleNextProv}> Prov sparat. Lägg till ett till prov </Button>
                        }
                </div>
                </form>
            </div>
        
        </>

    );
};


export default AddResult;