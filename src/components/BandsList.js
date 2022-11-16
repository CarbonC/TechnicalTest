import React, { useState, useEffect } from "react";
import { readString } from 'react-papaparse';
import bandsListCSV from '../assets/metal_bands_2017.csv';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';

export default function BandsList() {
  // to store the parse data
  const [data, setData] = useState([]);
  const headers = ["Band name", "Fans", "Formed", "Origin", "Split", "Style"]

  const loadData = () => {
    readString(bandsListCSV, {
      complete: (results, file) => {
        console.log('Parsing complete:', results, file);
        // sort data by name alphabetically
        setData(_.sortBy(results.data, o => o.band_name));
      },
      download: true,
      header: true,
      error: (error, file) => {
        console.log('Error while parsing:', error, file)
      }
    })
  };

  useEffect(() => {
    loadData(data);
  }, []); //empty array as second argument.

  console.log(data);

  return (
    <div className="bands">
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            )
            )}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.band_name}</td>
                <td>{row.fans}</td>
                <td>{row.formed}</td>
                <td>{row.origin}</td>
                <td>{row.split}</td>
                <td>{row.style}</td>
              </tr>
            )
            )}
        </tbody>
      </Table>
    </div>
  );
}
