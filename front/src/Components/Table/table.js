import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Table(props) {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/bands")
      .then((response) => {
        console.log(response.data);
        setBands(
          response.data.sort((a, b) => a.band_name.localeCompare(b.band_name))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <button>Band Name</button>
            </th>
            <th>Fans</th>
            <th>Formed</th>
            <th>
              <button>Origin</button>
            </th>
            <th>Split</th>
            <th>
              <button>Style</button>
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
