import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorController from "./middlewares/errorController.js";
import controller404 from "./middlewares/controller404.js";

const connection = await dbConnect();

connection.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

connection.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(controller404);

app.use(errorController);

export default app;
