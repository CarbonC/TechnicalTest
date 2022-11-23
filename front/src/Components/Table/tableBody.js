import React from "react";

export default function tableBody(props) {
  console.log(props.bands);
  console.log(props.bands.band_name);
  return (
    <>
      <tbody>
        {props.bands.map((band) => (
          <tr key={band.band_id}>
            <td>{band.band_name}</td>
            <td>{band.fans}</td>
            <td>{band.formed}</td>
            <td>{band.origin}</td>
            <td>{band.split}</td>
            <td>{band.style}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
