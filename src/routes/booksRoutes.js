import express from "express";
import BookController from "../controllers/bookController.js";
import paginate from "../middlewares/paginate.js";

const routes = express.Router();

routes.get("/livros", BookController.listBooks, paginate);
routes.get("/livros/busca", BookController.listBookByFilter, paginate);
routes.get("/livros/:id", BookController.listBookById);

routes.post("/livros", BookController.addBook);

routes.put("/livros/:id", BookController.updatedBook);

routes.delete("/livros/:id", BookController.deleteBook);

export default routes;
