import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Table(props) {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/bands")
      .then((response) => {
        console.log(response.data);
        const sortedData = response.data.sort((a, b) => {
          return a.band_name.localeCompare(b.band_name);
        });
        setBands(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSortByOrigin = () => {
    const sortedData = bands.sort((a, b) => {
      return a.origin.localeCompare(b.origin);
    });
    setBands(sortedData);
  };

  const handleSortByStyle = () => {
    const sortedData = bands.sort((a, b) => {
      return a.style.localeCompare(b.style);
    });
    setBands(sortedData);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Band Name</th>
            <th>Fans</th>
            <th>Formed</th>
            <th>
              <button onClick={handleSortByOrigin}>Origin</button>
            </th>
            <th>Split</th>
            <th>
              <button onClick={handleSortByStyle}>Style</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr key={band._id}>
              <td>{band.band_name}</td>
              <td>{band.fans}</td>
              <td>{band.formed}</td>
              <td>{band.origin}</td>
              <td>{band.split}</td>
              <td>{band.style}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
