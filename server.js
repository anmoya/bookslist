const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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


app.get('/', (req, res) => res.render('landing', {}));
app.get('/add-book', (req, res) => res.render('books/create'));
app.post('/add-book', async (req, res) => {
    const { booktitle, bookauthor } = req.body;
    const sql = `insert into books (title, authors) values ('${booktitle}','${bookauthor}')`;
    const result = await db.query(sql,[]);
    console.log(result);
    res.redirect('/book-list');
});
app.get('/book-list', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM books', []);
    res.render('books/list', { books: rows  });
});

app.listen(process.env.PORT, () => {
    console.log(`Levantado en ${process.env.PORT}`);
})