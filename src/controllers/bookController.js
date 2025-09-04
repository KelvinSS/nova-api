import book from "../models/Book.js";

class BookController {
  static async listBooks(req, res) {
    try {
      const listBooks = await book.find();
      res.status(200).json(listBooks);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` });
    }
  }

  static async listBookForId(req, res) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);
      res.status(200).json(bookFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` });
    }
  }

  static async addBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", book: newBook });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async updatedBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro removido com sucesso" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao excluir` });
    }
  }
}

export default BookController;
