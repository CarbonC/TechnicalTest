import React from 'react'
import './dataGridMetal.css'
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'band_name', headerName: 'Band Name', width: 150},
    { field: 'fans', headerName: 'Fans', width: 150},
    { field: 'formed', headerName: 'Formed', width: 150},
    { field: 'origin', headerName: 'Origin', width: 150 },
    { field: 'split', headerName: 'Split', width: 150 },
    { field: 'style', headerName: 'Style', width: 450},
];

async function getBandDataFromCSV() {
    const response = await fetch('./metal_bands_2017.csv')
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    const dataParsed = Papa.parse(csv);

    return dataParsed.data.slice(1);
}

export default function DataGridMetal() {
    var [rows, setRows] = React.useState([]);
    const [dataLen, setDataLen] = React.useState(0);

    React.useEffect(() => {
        getBandDataFromCSV()
        .then(data => {
            setDataLen(data.length);
            data.map((object) => {
                setRows(rows => [...rows, {
                    id: object[0],
                    band_name: object[1],
                    fans: object[2],
                    formed: object[3],
                    origin: object[4],
                    split: object[5],
                    style: object[6]
                }]);
            })
        })
        .catch(err => console.log(err));
    }, [])

    if (rows.length === dataLen) {
        return (
            <div>
                <div className="datagrid">
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    />
                </div>
            </div>
    )} else return (
        <div>
        </div>
    )
}
