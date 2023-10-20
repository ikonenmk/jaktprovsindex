import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
//import { GridSortModel } from '@mui/x-data-grid';
//import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RankCheckbox } from "./RankCheckbox";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Search = () => {

    /** Use states */

    //Use state för att spara värde för ikryssade boxar
    const [checkStatus, setCheckStatus] = useState([{ name: "sok", value: false }, { name: "skall", value: false }]);
    const onCheckChange = (newCheckStatus) => {
        setCheckStatus(newCheckStatus);
    };

    /** Use state för formulärdata */
    const [formData, setFormData] = useState({
        namn: "",
        regnr: "",
    });

    //Use state för raddata
    const [displayData, setDisplayData] = useState("");

    //Use state för ras-dropdown
    const [races, setRaces] = useState([{ name: "basset" }, {name: "cocker"}]);

    //use state för totalvärde för egenskapsmedeltal

    const [rankTotal, setRankTotal] = useState("0");

    //use state för sortering av tabell
    const [sortModel, setSortModel] = useState([
        {
            field: 'hund_regnr',
            sort: 'asc',
        },
    ]);

    /** ValueGetters för datagrid */


    /** Column och row definitions för datagrid */

    const columns: GridColDef[] = [
        { field: 'hund_regnr', headerName: 'Hund-ID', width: 150 },
        { field: 'namn', headerName: 'namn', width: 150},
        { field: 'sok', headerName: 'Sök (medel)', width: 150, type: 'number'},
        { field: 'skall', headerName: 'Skall (medel)', width: 150, type: 'number' },
        { field: 'ranking', headerName: 'Ranking', width: 150, type: 'number' },
    ];



    //** Funktioner */

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



    // *** Event handlers *** //


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

        /* test */
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
    // Hantera förändring av data
    const updateDogData = (hundras) => {

            axios
                .post("http://localhost:8000/findRace.php", {ras: hundras})
                .then((response) => {
                    setDisplayData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        
    };


    return (
        <>
            
            <div>
                <RankCheckbox onCheckChange={onCheckChange} />
            </div>
            <div>
                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    {races.map((item) => (
                        <Dropdown.Item onClick={() => updateDogData(item.name)}> { item.name } </Dropdown.Item>
                    ))};
                </DropdownButton>
            </div>
            <div>
                <ul>
                    {checkStatus.map(item => {
                        return <li>{item.name}</li>;
                    })}
                </ul>
                <button size="small" onClick={() => handleUpdateRow()}>
                    Update a row
                </button>
            </div>

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={displayData}
                    columns={columns}
                    sortModel={sortModel}
                />
            </div>
        </>

    );
};

export default Search;