import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Table from "./Components/Table/table";

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
        <h1>Metal Bands</h1>
      </header>
      <Table bands={bands} />
    </div>
  );
}
