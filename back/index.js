const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3500;
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/metal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bandSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  band_name: String,
  fans: Number,
  formed: Number,
  origin: String,
  split: Number,
  style: String,
});

const Band = mongoose.model("Band", bandSchema);

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bands", (req, res) => {
  Band.find()
    .exec()
    .then((bands) => {
      res.json(bands);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
