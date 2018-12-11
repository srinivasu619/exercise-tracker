const express = require('express');
const {
    db
} = require('./db');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

db.sync()
    .then(() => {

        app.listen(port, () => {
            console.log(`Started on http://localhost:${port}`);
        })

    })
    .catch(console.error)