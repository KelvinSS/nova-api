import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "O título do livro é obrigatório."],
    },
    publisher: {
      type: String,
      required: [true, "A editora é obrigatória."],
    },
    price: {
      type: Number,
    },
    pages: {
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      requered: [true, "O autor é obrigatório."],
    },
  },
  { versionKey: false }
);

const books = mongoose.model("livros", BookSchema);

export default books;
