import React, { useState } from "react";

export default function table(props) {
  const { bands } = props;
  return (
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
  );
}
