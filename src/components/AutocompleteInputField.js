import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//Komponent för input av data i addResult.js
const AutocompleteInputField = ({ handleNewInput }) => {

    //Hämta alla hundar  till usestate
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const newHundar = [];
            await axios
                .post("http://localhost:8000/findAll.php")
                .then((response) => {
                    console.log(response.data);
                    response.data.map((item) => {
                        newHundar.push(item);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            setOptions(newHundar);
        }
        fetchData();
    }, []);
    console.log(options);

    //För att göra namn input element read only
    const [isReadOnlyName, setIsReadOnlyName] = useState(false);
    const [isReadOnlyProperties, setIsReadOnlyProperties] = useState(true);
    const [listOptions, setListOptions] = useState({
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

    const optionListArray = Object.keys(listOptions);
    const keysToRemove = ["namn", "hund_regnr", "datum"];
    const filteredOptionsList = optionListArray.filter(key => !keysToRemove.includes(key));
    const [inputValue, setInputValue] = useState({
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


    
    //Hantera förändring av input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newInputValue = [];
        //Kontrollera om hund_regnr finns i databasen och tillåt endast fortsatt input om det finns
        if (e.target.name === "hund_regnr") {
            let chosenRegNr = e.target.value;
            const foundDog = options.find(item => item.hund_regnr === chosenRegNr);
            if (foundDog !== undefined) {
                setInputValue({ ...inputValue, hund_regnr: foundDog.hund_regnr, namn: foundDog.namn });
                newInputValue.push({ ...inputValue, hund_regnr: foundDog.hund_regnr, namn: foundDog.namn });
                setIsReadOnlyName(true);
                setIsReadOnlyProperties(false);
            } else {
                setInputValue({ ...inputValue, hund_regnr: value, namn : "", datum: "" });
                newInputValue.push({ ...inputValue, hund_regnr: value });
                setIsReadOnlyName(true);
                setIsReadOnlyProperties(true);
            }
        } else {
            setInputValue({ ...inputValue, [name]: value });
            newInputValue.push({ ...inputValue, [name]: value });
        }
        console.log(newInputValue);
        handleNewInput(newInputValue);
    };


    return (
        <>
        <div class="textInputContainer">
                <input
                    class="textInput"
                    type="text"
                    placeholder="Sök efter Reg nr"
                    value={inputValue.hund_regnr}
                    onChange={handleInputChange}
                    list="hundar_regnr"
                    name="hund_regnr"
                />
                <datalist id="hundar_regnr">
                    {options.map((option) => (
                        <option key={option.id} value={option.hund_regnr} />
                    ))}
                </datalist>
                <input
                    class="textInput"
                    type="text"
                    placeholder="namn"
                    value={inputValue.namn}
                    onChange={handleInputChange}
                    name="namn"
                    readOnly={isReadOnlyName}
                />
                <input type="text"
                    class="textInput"
                    placeholder="datum"
                    value={inputValue.datum}
                    onChange={handleInputChange}
                    name="datum"
                    readOnly={isReadOnlyProperties}
                />
                </div>
            <div class="selectContainer">
                <div class="selectButton">
                {filteredOptionsList.map((item, index) => (
                   
                    <Select name={item}
                        key={`inputField-${index}`}
                        onChange={handleInputChange}
                        defaultValue={item}
                        disabled={isReadOnlyProperties}
                    >
                        <MenuItem value={item}> {item}</MenuItem>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        </Select>
                    
                ))}
                </div>
            </div>
        </>
    );
}

export default AutocompleteInputField;