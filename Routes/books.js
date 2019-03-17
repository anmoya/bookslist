const router = require('express').Router();
const db = require('../db/db');

router.get('/', (req, res) => res.render('landing', {}));
router.get('/add', (req, res) => res.render('books/create'));
router.post('/add', async (req, res) => {
    const { booktitle, bookauthor } = req.body;
    const sql = `insert into books (title, authors) values ('${booktitle}','${bookauthor}')`;
    const result = await db.query(sql,[]);
    console.log(result);
    res.redirect('/books/list');
});
router.get('/list', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM books', []);
    res.render('books/list', { books: rows  });
});

module.exports = router;

