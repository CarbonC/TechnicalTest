import GroupCard from "../elements/groupCard"

export default function GroupCardList ({ data }) {
	console.log(data)
	const DisplayedGroups = data ? data.map((elem, idx) => (
		<GroupCard key={idx} 
					band_name={elem.band_name}
					fans={elem.fans}
					formed={elem.formed}
					origin={elem.origin}
					split={elem.split}
					style={elem.style}/> 
	)) : 
			<div>LOADING</div>

	return (
		<div>
			{DisplayedGroups}
		</div>
	)
}