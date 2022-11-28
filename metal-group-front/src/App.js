import './App.css';
import { useState, useEffect } from "react";
import Papa from 'papaparse'

function App() {
	let [display, setDisplay] = useState("style")
	let [sort, setSort] = useState("name")
	let [bands, setBands] = useState({})

	useEffect(() => {
			fetch("127.0.0.1:5000")
			.then(response => {
				Papa.parse(response.body, {complete: (result) => {
					setBands(result.data.json());
				}})
			})
			.catch (error => {
				setBands({data: error})
			})
		console.log(bands)
	}, [display, sort]);

	const ChangeDisplay = (style) => {
		setDisplay(style)
	}

	const ChangeSortType = (type) => {
		setSort(type)
	}

	const DisplayButtonStyle = (value) => {
		return (value === display) ? {
			background: "#b8bb26",} : {background: "#cc241d",}
	}
	const SortButtonStyle = (value) => {
		return (value === sort) ? {
			background: "#b8bb26",} : {background: "#cc241d",}
	}

	return (
		<div className="App">
			<h1>Cool Metal band viewer</h1>
			<nav>
				<div className="Choice">
					<p>Display band by:</p>
					<button
						onClick={()=>ChangeDisplay("style")}
						style={DisplayButtonStyle("style")}
					>Style</button>
					<button
						onClick={()=>ChangeDisplay("country")}
						style={DisplayButtonStyle("country")}
					>Country</button>
				</div>
				<div className="Choice">
					<p>Sort by:</p>
					<button
						onClick={()=>ChangeSortType("name")}
						style={SortButtonStyle("name")}
					>Name</button>
					<button
						onClick={()=>ChangeSortType("year")}
						style={SortButtonStyle("year")}
					>Year</button>
				</div>
			</nav>
			<div className="Bands">
				<p>hello</p>
				<p>{bands.body}</p>
			</div>
		</div>
	);
}

export default App;
