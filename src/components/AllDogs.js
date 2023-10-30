import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
//import { GridSortModel } from '@mui/x-data-grid';
//import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RankCheckbox } from "./RankCheckbox";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "../App.css"
import Button from 'react-bootstrap/Button';
import NavBarTop from "./NavBarTop";
import NavBarBottom from "./NavBarBottom";

//Huvudgränssnittför att visa datan i databasen

const AllDogs = () => {


    //Use state för att spara värde för ikryssade boxar
    const [checkStatus, setCheckStatus] = useState([{ name: "sok", value: false }, { name: "skall", value: false }]);

    //Hantera förändring av kryss i checkboxar
    const onCheckChange = (newCheckStatus) => {
        setCheckStatus(newCheckStatus);
    };


    //Use state för initial raddata
    const [displayData, setDisplayData] = useState("");
    useEffect(() => {
        // Axios request here
        axios.post("http://localhost:8000/findAll.php")
            .then((response) => {
                setDisplayData(response.data);
            })
            .catch((error) => {
                console.error('Axios request error: ', error);
            });
    }, []);

    //Use state för ras-dropdown
    const [races, setRaces] = useState([{ name: "basset" }, {name: "cocker"}]);

    //use state för sortering av tabell
    const [sortModel, setSortModel] = useState([
        {
            field: 'hund_regnr',
            sort: 'asc',
        },
    ]);

    /** Column och row definitions för datagrid */

    const columns: GridColDef[] = [
        { field: 'hund_regnr', headerName: 'Hund-ID', width: 100 },
        { field: 'namn', headerName: 'namn', width: 100 },
        { field: 'sok', headerName: 'Sök (medel)', width: 100, type: 'number'},
        { field: 'skall', headerName: 'Skall (medel)', width: 100, type: 'number' },
        { field: 'upptagsarbete', headerName: 'Upptagsarbete (medel)', width: 100, type: 'number' },
        { field: 'vackning_pa_slag', headerName: 'Väckning på slag', width: 100, type: 'number' },
        { field: 'drevarbete', headerName: 'Drevarbete', width: 100, type: 'number' },
        { field: 'vackning_pa_tappt', headerName: 'Väckning på tappt', width: 100, type: 'number' },
        { field: 'skall_horbarhet', headerName: 'Skall hörbarhet', width: 100, type: 'number' },
        { field: 'skall_under_drev', headerName: 'Skall under drev', width: 100, type: 'number' },
        { field: 'samarbete', headerName: 'Samarbete', width: 100, type: 'number' },
        { field: 'lydnad', headerName: 'Lydnad', width: 100, type: 'number' },
        { field: 'ranking', headerName: 'Ranking', width: 100, type: 'number' },
    ];


    //Funktion för att hämta rankingvärde från backend
    const calculateRank = async (hundId, propertyNames) => { 
        //objekt innehållandes arrayen propertyNames
        const queryArray = {
            egenskaper: propertyNames,
            hundId: hundId
        }

        const resp = await axios
            .post("http://localhost:8000/getAverage.php", queryArray)
            .catch(error => {
                console.error(error);
            });
        return resp.data.average;
    };

    //Handler för att uppdatera rader vid klick på checkbox
    const handleUpdateRow = async () => {
        
        //Kontrollera vilka egenskaper som är ikryssade (d.v.s. har värdet true)
        const pickedProperties = checkStatus.filter(item => item.value === true);
        //skapa lokal array innehållandes endast egenskapsnamn för ikryssade egenskaper
        const propertyNames = pickedProperties.map((item) => {
            if (item.value === true) {
                return item.name;
            }

        });

        /* Ranking */
        const valueArray = [];
        for (var i = 0; i < displayData.length; i++) {
            const res = await calculateRank(displayData[i].hund_regnr, propertyNames);
            valueArray.push({ ...displayData[i], ranking: res });
        };
        console.log(valueArray);

        //Sortera array så att hund med högst rankingvärde hamnar först
        valueArray.sort((a, b) => {
            if (a.ranking > b.ranking) {
                return -1;
            }
            if (a.ranking < b.ranking) {
                return 1;
            }
            return 0;
        });

        //Ändra värde för ranking, högst värde får nytt värde 1 
        const newDisplayData = valueArray.map((item, index) => ({
            ...item,
            ranking: index + 1,
        }));
        //Uppdatera state för datagrid
        setDisplayData(newDisplayData);
        //Uppdatera sortering, visa rank 1 överst
        setSortModel([{ field: 'ranking', sort: 'asc' }]);


    };
    // Hantera förändring av data baserat på ras-dropdown
    const updateDogData = (hundras) => {

            axios
                .post("http://localhost:8000/findRace.php", {ras: hundras})
                .then((response) => {
                    console.log(response.data);
                    setDisplayData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        
    };


    return (
        <>

            <div class="container">
                <div class="dropDownButtonContainer">
                    <div class="dropDownButtonElement">
                        <DropdownButton id="dropdown-basic-button" title="Välj ras" variant="success">
                            {races.map((item) => (
                                <Dropdown.Item onClick={() => updateDogData(item.name)}> {item.name} </Dropdown.Item>
                            ))};
                        </DropdownButton>
                    </div>
                </div>
               
                <div class="rankCheckBoxContainer">
                        <RankCheckbox onCheckChange={onCheckChange} />
                </div>
                <div class="rankButtonContainer">
                    <Button size="small" variant="success" onClick={() => handleUpdateRow()}>
                        Uppdatera ranking
                    </Button>
                </div>
                <div class="gridContainer">
                    <DataGrid
                        rows={displayData}
                        columns={columns}
                        sortModel={sortModel}
                    />
                </div>
                <NavBarBottom />
            </div>
        </>

    );
};

export default AllDogs;