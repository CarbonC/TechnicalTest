import React, { useState, useEffect } from "react";
import { readString } from 'react-papaparse';
import bandsListCSV from '../assets/metal_bands_2017.csv';
import Table from 'react-bootstrap/Table';
import Filters from './Filters';
import _ from 'lodash';

export default function BandsList() {
  // to store the parse data
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const headers = ["Band name", "Fans", "Formed", "Origin", "Split", "Style"]
  const [countries, setCountries] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const loadData = () => {
    readString(bandsListCSV, {
      complete: (results, file) => {
        console.log('Parsing complete:', results, file);
        // sort data by name alphabetically
        setData(_.sortBy(results.data, o => o.band_name));
        setInitialData(_.sortBy(results.data, o => o.band_name));
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

  useEffect(() => {
    setCountries([...new Set(data.map(function (el) { return el.origin }))]);
    setStyles([...new Set(data.map(function (el) { return el.style }))]);
  }, [initialData]);


  // FILTERS
  // note: filters are not interdependent:
  // - click on all will display all records, even if the other filter is set
  // - only the last filter is taken into account, can't combine two filters (lack of time to implement)

  const handleSelectStyle = (evt) => {
    setSelectedStyle(evt.target.value);

    const filtered_data = initialData.filter((band) => {
      if (evt.target.value === "all") {
        return band;
      } else {
        return band.style === evt.target.value;
      }
    });
    setData(filtered_data);
  };

  const handleSelectCountry = (evt) => {
    setSelectedCountry(evt.target.value);

    const filtered_data = initialData.filter((band) => {
      if (evt.target.value === "all") {
        return band;
      } else {
        return band.origin === evt.target.value;
      }
    });
    setData(filtered_data);
  };

  return (
    <div className="bands">
      {
        (styles.length && countries.length) && (
          <Filters
            handleSelectStyle={handleSelectStyle}
            handleSelectCountry={handleSelectCountry}
            selectedStyle={selectedStyle}
            selectedCountry={selectedCountry}
            styles={styles}
            countries={countries}
          />
        )
      }

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