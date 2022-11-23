import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/bands")
      .then((response) => {
        console.log(response.data);
        setBands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>App</h1>
        <div className="bands-table">
          <table>
            <thead>
              <tr>
                <th>Band Name</th>
                <th>Fans</th>
                <th>Formed</th>
                <th>Origin</th>
                <th>Split</th>
                <th>Style</th>
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
        </div>
      </header>
    </div>
  );
}
