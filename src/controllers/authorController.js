import NotFound from "../error/NotFound.js";
import { Author } from "../models/index.js";

class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const listAuthors = await Author.find();

      if (listAuthors !== null) {
        res.status(200).json(listAuthors);
      } else {
        next(new NotFound("Não há autores cadastrados"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listAuthorsForId(req, res, next) {
    try {
      const id = req.params.id;
      const authorFound = await Author.findById(id);

      if (authorFound !== null) {
        res.status(200).json(authorFound);
      } else {
        next(new NotFound("Id do autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async addAuthor(req, res, next) {
    try {
      const newAuthor = await Author.create(req.body);
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso", Author: newAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async updatedAuthor(req, res, next) {
    try {
      const id = req.params.id;
      const authorUpdated = await Author.findByIdAndUpdate(id, req.body);

      if (authorUpdated !== null) {
        res.status(200).json({ message: "Autor atualizado com sucesso." });
      } else {
        next(new NotFound("Id do autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id;
      const authotForDeleted = await Author.findByIdAndDelete(id);

      if (authotForDeleted !== null) {
        res.status(200).json({ message: "Autor removido com sucesso" });
      } else {
        next(new NotFound("Id do autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
