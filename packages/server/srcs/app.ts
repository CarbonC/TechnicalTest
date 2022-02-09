import express, { Request, Response } from "express";

import fs from "fs";
import csv from "csv-parser";

import cors, { CorsOptions } from "cors";

type Band = {
  band_name: string;
  fans: string;
  formed: string;
  origin: string;
  split: string;
  style: string;
};

const corsOptions: CorsOptions = {
  credentials: true,
  origin: true,
};

const bands: Band[] = [];

async function fetchBands() {
  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => {
      let band: Band = {
        band_name: row.band_name,
        fans: row.fans,
        formed: row.formed,
        origin: row.origin,
        split: row.split,
        style: row.style,
      };
      bands.push(band);
    });
}

/////////////////////////////////////////////////
// Controller
/////////////////////////////////////////////////

export function getBands(req: Request, res: Response, next) {
  res.send(bands);
}

/////////////////////////////////////////////////
// Main
/////////////////////////////////////////////////

async function createApi(port = 3000) {
  const server = express();

  server.use(cors(corsOptions));

  await fetchBands();

  server.get("/bands", getBands);

  server.listen(port, () => {
    console.log("Server online");
  });
}

async function main() {
  try {
    await createApi();
  } catch (err) {
    console.error(err);
  }
}

main();
