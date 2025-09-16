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
      enum: {
        values: ["Casa do código", "Classicos"],
        message: "A editora {VALUE} não é um valor permitido.",
      },
    },
    price: {
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      requered: [true, "O autor é obrigatório."],
    },
    pages: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "O número de páginas({VALUE}) deve estar entre 10 e 5000",
      },
    },
  },
  { versionKey: false }
);

const books = mongoose.model("livros", BookSchema);

export default books;
