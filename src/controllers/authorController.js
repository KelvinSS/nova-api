import { author } from "../models/Author.js";

class AuthorController {
  static async listAuthors(req, res) {
    try {
      const listAuthors = await author.find();
      res.status(200).json(listAuthors);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` });
    }
  }

  static async listAuthorsForId(req, res) {
    try {
      const id = req.params.id;
      const authorFound = await author.findById(id);
      res.status(200).json(authorFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` });
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso", Author: newAuthor });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar autor` });
    }
  }

  static async updatedAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor removido com sucesso" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao excluir` });
    }
  }
}

export default AuthorController;
