import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//Value getters
const getValue = (params) => {
    return params.row.age + 50;
};

//Columns definition
    const columns = [
      { field: 'id' },
      { field: 'username', width: 150 },
        { field: 'age', width: 80, type: 'number' },
        { field: 'test', width: 89, type: 'number', valueGetter: getValue },
        { field: 'test2', width: 89, type: 'number' },
    ];

let idCounter = 0;
const createRandomRow = () => {
  idCounter += 1;
    return { id: idCounter, username: randomUserName(), age: randomInt(10, 80) };
    return { id: idCounter, username: randomUserName(), age: randomInt(10, 80) };
};

export default function UpdateRowsProp() {
    const [rows, setRows] = React.useState(() => [{ id: 1, username: "test", age: 23 }, {id: 2, username: "test2", age: 33}

  ]);

  const handleUpdateRow = (id) => {
    if (rows.length === 0) {
      return;
    }
    setRows((prevRows) => {
        const rowToUpdateIndex = id; //randomInt(0, rows.length - 1);

      return prevRows.map((row, index) =>
        index === rowToUpdateIndex ? { ...row, test2: 1 } : row,
      );
    });
  };

  const handleUpdateAllRows = () => {
    setRows(rows.map((row) => ({ ...row, username: randomUserName() })));
  };

  const handleDeleteRow = () => {
    if (rows.length === 0) {
      return;
    }
    setRows((prevRows) => {
      const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex + 1),
      ];
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRandomRow()]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={() => handleUpdateRow(0)}>
          Update a row
        </Button>
        <Button size="small" onClick={handleUpdateAllRows}>
          Update all rows
        </Button>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <Box sx={{ height: 400, mt: 1 }}>
              <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}