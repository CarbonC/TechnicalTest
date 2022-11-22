import { MetalBand } from "../types";

const API_URL = "http://localhost:3002";

export function fetchData(records : number) {
  return new Promise<MetalBand[]>((resolve, reject) => {
    fetch(`${API_URL}/metalBands?records=${records}`)
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
}
