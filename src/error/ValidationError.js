import BadReq from "./BadReq.js";

class ValidationError extends BadReq {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((err) => err.message)
      .join("; ");

    super(`Erro de validação: ${errorMessages}`);
  }
}

export default ValidationError;
