import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RankCheckbox } from "./RankCheckbox";



const Search = () => {

    //Hämta medeltal
    const [medeltalSok, setMedeltalSok] = useState("");
    const [medeltalSkall, setMedeltalSkall] = useState("");

    useEffect(() => {
        axios
            .post("http://localhost:8000/calculateMedeltal.php")
            .then((response) => {
                console.log(response);
                setMedeltalSok(response.data.medelSok);
                setMedeltalSkall(response.data.medelSkall);
            })
            .catch((error) => {
                console.log(error);
            });

    });


    const sokGetter = (params) => {
        console.log();
        return params.row.sok - medeltalSok;
    };

    const skallGetter = (params) => {
        console.log();
        return params.row.skall - medeltalSkall;
    };

    const rankGetter = (params) => {
        console.log();
        var returnValue;
        var skall = "checked";
        if (skall == "checked") {
            returnValue = "1";
        } else {
            returnValue = "0";
        }
        return returnValue;
    };

    const columns: GridColDef[] = [
        { field: 'datum', headerName: 'Datum', width: 150 },
        { field: 'sok', headerName: 'Sök', width: 150 },
        { field: 'skall', headerName: 'Skall', width: 150 },
        { field: 'poangSok', headerName: 'Sokpoang over medel', width: 150, valueGetter: sokGetter },
        { field: 'poangSkall', headerName: 'Skallpoang over medel', width: 150, valueGetter: skallGetter },
        { field: 'ranking', headerName: 'Ranking', width: 150, valueGetter: rankGetter },
    ];

    const [displayData, setDisplayData] = useState([]);

    const rows = displayData;


    // Initial state formData (input)
    const [formData, setFormData] = useState({
        namn: "",
        regnr: "",
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
            .post("http://localhost:8000/server.php", formData)
            .then((response) => {
                setDisplayData(response.data); //Uppdatera rad-data med array med JSON-objekt från server
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="regnr">Hundens regnr:</label>
                <input
                    type="text"
                    name="regnr"
                    value={formData.regnr}
                    onChange={handleInputChange}
                />
            </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <RankCheckbox />
            </div>

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </>

    );
};

export default Search;