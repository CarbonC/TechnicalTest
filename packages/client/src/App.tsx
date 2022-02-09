import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";

import "./App.scss";

type Band = {
  band_name: string;
  fans: string;
  formed: string;
  origin: string;
  split: string;
  style: string;
};

const columns: TableColumn<Band>[] = [
  {
    name: "Name",
    selector: (row) => row.band_name,
    sortable: true,
  },
  {
    name: "Fans",
    selector: (row) => row.fans,
    sortable: true,
  },
  {
    name: "Formed",
    selector: (row) => row.formed,
    sortable: true,
  },
  {
    name: "Origin",
    selector: (row) => row.origin,
    sortable: true,
  },
  {
    name: "Split",
    selector: (row) => row.split,
    sortable: true,
  },
  {
    name: "Style",
    selector: (row) => row.style,
    sortable: true,
    grow: 4,
  },
];

function App() {
  const [bands, setBands] = useState<Band[]>([]);

  const [styleField, setStyleField] = useState("");
  const [countryField, setCountryField] = useState("");

  useEffect(() => {
    const fetchBands = async () => {
      const { data } = await axios.get("http://localhost:3000/bands", {
        withCredentials: true,
      });
      setBands(data);
    };
    fetchBands();
  }, []);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    if (e.currentTarget.name == "style") {
      setStyleField(newValue);
    } else if (e.currentTarget.name == "country") {
      setCountryField(newValue);
    }
  };

  const getBandsList = () => {
    return bands.filter(
      (band) =>
        band.style.toLowerCase().includes(styleField.toLowerCase()) &&
        band.origin.toLowerCase().includes(countryField.toLowerCase())
    );
  };

  return (
    <div className="content">
      <h1 className="title">
        Kobi test - Data visualization from Thomas Germain
      </h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Style"
          name="style"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={onChange}
        />
      </div>
      <div className="data">
        <DataTable
          columns={columns}
          data={getBandsList()}
          pagination
          paginationComponentOptions={{ selectAllRowsItem: true }}
          defaultSortFieldId={1}
        />
      </div>
    </div>
  );
}

export default App;
