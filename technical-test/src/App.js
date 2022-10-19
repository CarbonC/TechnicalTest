import './App.css';
import Filters from './elements/filters';
import { lazy, useEffect, useState } from 'react';
import dataCsv from "./metal_bands_2017.csv"
import Papa from "papaparse";
import GroupCardList from './component/groupCardList';

function App() {
	const [data, setData] = useState([])
	const [sortedData, setSortedData] = useState([])

	const loadData = async () => {
        Papa.parse(dataCsv, {
            header: true,
            download: true,
              complete: (result) => {
				const sortedResult = result.data.sort((a, b) => a.band_name < b.band_name)
				setSortedData(sortedResult)
				setData(sortedResult)
           }
        })
    }

    useEffect(() => {
		loadData()
		console.log(data)
    }, [])

	return (
		<div className="App">
			{
				data !== undefined &&
					<Filters data={data} setSortedData={setSortedData}/>
			}
			{
				sortedData !== undefined &&
					<GroupCardList data={sortedData}/>
			}
		</div>
	);
}

export default App;
