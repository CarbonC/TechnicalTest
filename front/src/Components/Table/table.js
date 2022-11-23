import React from "react";
import TableBody from "./tableBody";
import TableHead from "./tableHead";

export default function table(props) {
  return (
    <div>
      <table>
        <TableHead />
        <TableBody bands={props.bands} />
      </table>
    </div>
  );
}
