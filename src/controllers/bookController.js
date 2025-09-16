import NotFound from "../error/NotFound.js";
import { Author, books } from "../models/index.js";

class BookController {
  static async listBooks(req, res, next) {
    try {
      const searchBooks = books.find().populate("author");
      req.result = searchBooks;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async listBookById(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await books.findById(id).populate("author");
      if (bookFound !== null) {
        res.status(200).json(bookFound);
      } else {
        next(new NotFound("Id do livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async addBook(req, res, next) {
    try {
      let book = new books(req.body);
      const newBook = await book.save();
      res.status(201).send(newBook.toJSON());
    } catch (error) {
      next(error);
    }
  }

  static async updatedBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await books.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (bookFound !== null) {
        res.status(200).json({ message: "Livro atualizado com sucesso." });
      } else {
        next(new NotFound("Id do livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await books.findByIdAndDelete(id);

      if (bookFound !== null) {
        res.status(200).json({ message: "Livro removido com sucesso" });
      } else {
        next(new NotFound("Id do livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listBookByFilter(req, res, next) {
    try {
      const search = await processSeach(req.query);

      if (search !== null) {
        const bookFound = books.find(search).populate("author");
        req.result = bookFound;

        if (bookFound.length === 0) {
          next(new NotFound("Nenhum livro encontrado."));
        } else {
          next();
        }
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function processSeach(params) {
  const { publisher, title, minPages, maxPages, nameAuthor } = params;

  let search = {};
  if (publisher) search.publisher = publisher;
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) search.pages = {};
  if (minPages) search.pages.$gte = minPages;
  if (maxPages) search.pages.$lte = maxPages;

  if (nameAuthor) {
    const author = await Author.findOne({
      name: { $regex: nameAuthor, $options: "i" },
    });

    if (author !== null) {
      search.author = author._id;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
