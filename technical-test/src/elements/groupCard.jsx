export default function GroupCard(props)
{
    const styles = props.style ?  props.style.split(",") : undefined
    return (
        <div>
            <h2>{props.band_name}</h2>
            <span>{props.formed} - {props.split === "-" ? "now" : props.split } </span>
            {props.origin}
            <ul>
                {
                    styles && styles.map((elem, idx) => 
                        <li key={idx}>{elem}</li>
                    )
                }
            </ul>
        </div>
    )
}