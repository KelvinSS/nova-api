import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
    },
    price: {
      type: Number,
    },
    pages: {
      type: Number,
    },
  },
  { versionKey: false }
);

const book = mongoose.model("livros", BookSchema);

export default book;
