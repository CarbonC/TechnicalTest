const express = require('express');
const app = express();

const PORT = process.env.APP_PORT || 3000;

const routes = require('./routes/index');
app.use(routes);

app.listen(PORT, () => {
    console.log(`Stokelp technical-test API listening at http://localhost:${PORT}`)
});