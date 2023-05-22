const Book = require('../models/Book');
const Author = require('../models/Author');

const mongoDataMethods = {
  getAllBooks: async (condition = null) =>
    condition === null ? await Book.find() : await Book.find(condition),

  getBookById: async id => await Book.findById(id),

  getAllAuthors: async () => await Author.find(),

  getAuthorById: async id => await Author.findById(id),

  createAuthor: async args => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },

  createBook: async args => {
    const newBook = new Book(args);
    return await newBook.save();
  },

  deleteBook: async id => {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      throw new Error(`Book with ID ${id} does not exist.`);
    }
    return deletedBook;
  },

  deleteAuthor: async id => {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      throw new Error(`Author with ID ${id} does not exist.`);
    }
    await Book.deleteMany({ author: id });
    return deletedAuthor;
  },
};

module.exports = mongoDataMethods;
