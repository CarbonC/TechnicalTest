import BandInfo from "./components/BandInfo";
import Papa from 'papaparse';
import {useState, useEffect} from "react";

// async function getData() {
//   const response = await fetch('metal_bands_2017.csv'); //problème au niveau du chemin => au lieu de mettre chemin relatif, juste mettre le nom du fichier
//   const table = await response.text();
//   const results = Papa.parse(table, { header: true });
//   const rows = results.data;
//   //console.log(rows);
//   return rows
// }

function App() {
  const [data,setData] = useState();

  async function getData() {
      const response = await fetch('metal_bands_2017.csv'); //problème au niveau du chemin => au lieu de mettre chemin relatif, juste mettre le nom du fichier
      const table = await response.text();
      const results = Papa.parse(table, { header: true });
      setData(results.data);
    }

    useEffect(() => {
      getData()
    }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          List of Metal Bands up to 2017
        </h1>
        <ul>
          <BandInfo></BandInfo>
        </ul>
      </header>
    </div>
  );
}

export default App;
