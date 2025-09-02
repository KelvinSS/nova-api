import express from "express";

const app = express();
app.use(express.json());

const livros = [
  { id: 1, titulo: "Senhor dos Anéis" },
  { id: 2, titulo: "O Hobbit" },
];

function findBook(id) {
  return livros.findIndex((livro) => livro.id === Number(id));
}

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
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
