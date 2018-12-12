const express = require('express');
const {
    db
} = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api', require('./routes/index'));

require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.render('index')
})
db.sync()
    .then(() => {

        app.listen(port, () => {
            console.log(`Started on http://localhost:${port}`);
        })

    })
    .catch(console.error)