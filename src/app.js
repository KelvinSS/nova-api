import express from "express";
import dbConnect from "./config/dbConnect.js";
import book from "./models/Book.js";

const connection = await dbConnect();

connection.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

connection.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/livros", async (req, res) => {
  const listBook = await book.find({});
  res.status(200).json(listBook);
});

app.get("/livros/:id", (req, res) => {
  const index = findBook(req.params.id);
  if (index < 0) {
    res.status(404).send("Livro não encontrado");
  } else {
    res.status(200).json(livros[index]);
  }
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const index = findBook(req.params.id);
  if (index < 0) {
    res.status(404).send("Livro não encontrado");
  } else {
    livros[index].titulo = req.body.titulo;
    res.status(200).send("Livro atualizado com sucesso");
  }
});

app.delete("/livros/:id", (req, res) => {
  const index = findBook(req.params.id);
  if (index < 0) {
    res.status(404).send("Livro não encontrado");
  } else {
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso");
  }
});

export default app;
