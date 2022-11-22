const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

const routes = require('./routes/index');
app.use(routes);

const PORT = process.env.APP_PORT || 3002;
app.listen(PORT, () => {
    console.log(`Stokelp technical-test API listening at http://localhost:${PORT}`)
});