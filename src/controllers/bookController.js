import NotFound from "../error/NotFound.js";
import { books } from "../models/index.js";

class BookController {
  static async listBooks(req, res, next) {
    try {
      const listBooks = await books.find().populate("author").exec();
      res.status(200).json(listBooks);
    } catch (error) {
      next(error);
    }
  }

  static async listBookForId(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await books
        .findById(id)
        .populate("author", "name")
        .exec();

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
      const bookFound = await books.findByIdAndUpdate(id, req.body);

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

  static async listBookForPublisher(req, res, next) {
    const publisher = req.query.publisher;
    try {
      const booksByPublisher = await books.find({ publisher: publisher });

      if (booksByPublisher.length === 0) {
        next(new NotFound("Nenhum livro encontrado para essa editora."));
      } else {
        res.status(200).json(booksByPublisher);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
