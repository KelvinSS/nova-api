import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/livros", BookController.listBooks);
routes.get("/livros/:id", BookController.listBookForId);

routes.post("/livros", BookController.addBook);

routes.put("/livros/:id", BookController.updatedBook);

routes.delete("/livros/:id", BookController.deleteBook);

export default routes;
