import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from '@mui/x-data-grid';




const Search = () => {

    //Hämta medeltal
    const [medeltal, setMedeltal] = useState("");
    useEffect(() => {
        axios
            .post("http://localhost:8000/calculations.php")
            .then((response) => {
                console.log(response);
                setMedeltal(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    });


    const testGetter = (params) => {
        console.log();
        return params.row.sok - medeltal;
    };

    const columns: GridColDef[] = [
        { field: 'datum', headerName: 'Datum', width: 150 },
        { field: 'sok', headerName: 'Sök', width: 150 },
        { field: 'skall', headerName: 'Skall', width: 150 },
        { field: 'poangSok', headerName: 'Poang over medel', width: 150, valueGetter: testGetter },
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
            <div></div>
            </form>

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </>

    );
};

export default Search;