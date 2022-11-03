import './App.css'
import BandInfo from "./components/BandInfo";
import Papa from 'papaparse';
import {useState, useEffect} from "react";

function App() {
  const [dataParsed,setDataParsed] = useState();

  async function getData() {
      const response = await fetch('metal_bands_2017.csv'); //problème au niveau du chemin => au lieu de mettre chemin relatif, juste mettre le nom du fichier
      const table = await response.text();
      const results = Papa.parse(table, { header: true });
      const resultsArray = results.data;
      //console.log(resultsArray)
      const sortedResults = resultsArray.sort((a, b) => {
        return a.band_name > b.band_name ? 1 : -1
      })
      setDataParsed(sortedResults);
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
      </header>
      <main>
        <ul>
          {dataParsed && dataParsed.map((data) => (
          <BandInfo data={data}></BandInfo>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
