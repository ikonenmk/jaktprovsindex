import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

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
        console.log(e.target.name);
        console.log(e.target.value);
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
            <div class="selectContainer">
                    <Form>
                    <Row>
                        <Col>
                            <Stack gap={2} direction="horizontal" className="mb-2">

                                <datalist id="hundar_regnr">
                                    {options.map((option) => (
                                        <option key={option.id} value={option.hund_regnr} />
                                    ))}
                                </datalist>

                                <Form.Control
                                    class="textInput"
                                    type="text"
                                    placeholder="Sök efter Reg nr"
                                    value={inputValue.hund_regnr}
                                    onChange={handleInputChange}
                                    list="hundar_regnr"
                                    name="hund_regnr"
                                    data-bs-theme="dark"
                                />
                                <Form.Control
                                    class="textInput"
                                    type="text"
                                    placeholder="namn"
                                    value={inputValue.namn}
                                    onChange={handleInputChange}
                                    name="namn"
                                    disabled
                                    data-bs-theme="dark"
                                />
                                <Form.Control
                                    type="text"
                                    class="textInput"
                                    placeholder="datum"
                                    value={inputValue.datum}
                                    onChange={handleInputChange}
                                    name="datum"
                                    disabled={isReadOnlyProperties}
                                    data-bs-theme="dark"
                                />
                            </Stack>         
                            {filteredOptionsList.map((item, index) => (
                             <Col xs="auto">
                                 <Form.Select aria-label="Default select example"
                                    key={`inputField-${index}`}
                                    onChange={handleInputChange}
                                    defaultValue={item}
                                    disabled={isReadOnlyProperties}
                                    name={item}
                                    data-bs-theme="dark"
                                    className="mb-2"
                                    >
                                    <option>{item}</option>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                 </Form.Select>
                             </Col>
                            ))}
                        </Col>
                        </Row>
                </Form>
               
            </div>
        </>
    );
}

export default AutocompleteInputField;