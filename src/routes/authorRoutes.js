import express from "express";
import AuthorController from "../controllers/authorController.js";
import paginate from "../middlewares/paginate.js";

const routes = express.Router();

routes.get("/autor", AuthorController.listAuthors, paginate);
routes.get("/autor/:id", AuthorController.listAuthorsForId);

routes.post("/autor", AuthorController.addAuthor);

routes.put("/autor/:id", AuthorController.updatedAuthor);

routes.delete("/autor/:id", AuthorController.deleteAuthor);

export default routes;
