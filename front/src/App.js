import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3500/bands").then((res) => {
      setBands(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>App</h1>
      </header>
    </div>
  );
}
