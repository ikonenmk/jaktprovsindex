import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
//import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RankCheckbox } from "./RankCheckbox";



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

    //Use state för medeltal
    const [medeltalSok, setMedeltalSok] = useState("");
    const [medeltalSkall, setMedeltalSkall] = useState("");

    //Hämta medeltal via php api
    useEffect(() => {
        axios
            .post("http://localhost:8000/calculateMedeltal.php")
            .then((response) => {
                setMedeltalSok(response.data.medelSok);
                setMedeltalSkall(response.data.medelSkall);
            })
            .catch((error) => {
                console.log(error);
            });

    });


    /** ValueGetters för datagrid */

    const sokGetter = (params) => {
        return params.row.sok - medeltalSok;
        //return params.row.sok - medeltalSok;
    };

    const skallGetter = (params) => {
        return params.row.skall - medeltalSkall;
    };

    /** Column och row definitions för datagrid */

    const columns: GridColDef[] = [
        { field: 'datum', headerName: 'Datum', width: 150 },
        { field: 'sok', headerName: 'Sök', width: 150, type: 'number' },
        { field: 'skall', headerName: 'Skall', width: 150, type: 'number' },
        { field: 'poangSok', headerName: 'Sokpoang over medel', width: 150, type: 'number', valueGetter: sokGetter },
        { field: 'poangSkall', headerName: 'Skallpoang over medel', width: 150, type: 'number', valueGetter: skallGetter },
        { field: 'ranking', headerName: 'Ranking', width: 150 , type: 'number'},
    ];

    const [displayData, setDisplayData] = useState([]); //use state hook för att uppdatera raddata


    //** Funktioner */

    //För att räkna ut rankingvärde
    const calculateRank = (dogId, propertyNames) => {
        console.log(dogId);
        var total;
        for (var i = 0; i < propertyNames.length; i++) {
            let property = propertyNames[i];
            //skicka till php api för att hämta medeltal för egenskapsnamn för hund med detta id
            //lägg till medeltal till total
            console.log(property);
        }
      return total;
    };

    // *** Event handlers *** //


    //Handler för att uppdatera rader vid klick på checkbox
    const handleUpdateRow = () => {
        console.log(checkStatus);
        //uppdatera med medeltal för varje egenskap i checkStatus som har value = true
        //kolla vilka names som har checkstatus value = true
        //Kontrollera vilka egenskaper som är ikryssade (d.v.s. har värdet true)
        const pickedProperties = checkStatus.filter(item => item.value === true);
        //
        const propertyNames = pickedProperties.map((item) => {
            if (item.value === true) {
                return item.name;
            } 
            
        });

        console.log(propertyNames);
      

        setDisplayData(displayData.map((row) => ({ ...row, ranking: calculateRank(row.id, propertyNames) })));
        
            
    };
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
                <RankCheckbox onCheckChange={onCheckChange}  />
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
                />
            </div>
        </>

    );
};

export default Search;