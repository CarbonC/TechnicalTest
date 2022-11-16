import { React } from 'react';

function Filters(props) {
  const {
    styles,
    countries,
    selectedStyle,
    selectedCountry,
    handleSelectStyle,
    handleSelectCountry,
  } = props;

  const selectStyle = event => {
    console.log(event.target.value);
    handleSelectStyle(event);
  };

  const selectCountry = event => {
    console.log(event.target.value);
    handleSelectCountry(event);
  };

  return (
    <div>
      <div className="">
        <div className="text-lg font-bold mb-2">Styles</div>
        <select value={selectedStyle} onChange={selectStyle}>
          <option key={"all"} value={"all"}>
            All
          </option>
          {styles.sort().map((style, i) => (
            <option key={i} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <div className="text-lg font-bold mb-2">Countries</div>
        <select value={selectedCountry} onChange={selectCountry}>
          <option key={"all"} value={"all"}>
            All
          </option>
          {countries.sort().map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
