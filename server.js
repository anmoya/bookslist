const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bookRouter = require('./Routes/books');
const { Client, Pool } = require('pg');
const db = require('./db/db');

const pool = new Pool({
    host: 'localhost',
    database: 'booklist',
    password: null,
    port: 5433
});

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/books', bookRouter);




app.listen(process.env.PORT, () => {
    console.log(`Levantado en ${process.env.PORT}`);
})