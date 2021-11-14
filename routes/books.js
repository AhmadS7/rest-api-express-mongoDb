const express = require('express');
const router = express.Router();

const Book = require('../models/book');

// Getting All
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Books Not Found' });
  }
});
// Getting One
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});
// Creating One
router.post('/', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    bookPublisher: req.body.bookPublisher,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.json({ message: err.message });
  }
});
// Updating One
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }
  if (req.body.bookPublisher != null) {
    res.book.bookPublisher = req.body.bookPublisher;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: message.err });
  }
});
// Deleting One
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted One' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannont find the Book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
