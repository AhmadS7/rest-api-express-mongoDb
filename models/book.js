const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  bookPublisher: {
    type: 'string',
    required: true,
  },
  bookReelase: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('book', booksSchema);
