import "./BandInfo.css"

function BandInfo (props) {
    return (
        <div className="div">
          <li key={props.data.id}>
            <h2>{props.data.band_name}</h2>
            <div className="infos">
              <p className="formed">Formed: {props.data.formed}</p>
              <p className="origin">Origin: {props.data.origin}</p>
              <p className="split">Split: {props.data.split}</p>
              <p className="style">Style: {props.data.style}</p>
              <p className="fans">Fans: {props.data.fans}</p>
            </div>
          </li>
        </div>
    )
}


export default BandInfo;