import ErrorBase from "./ErrorBase.js";

class BadReq extends ErrorBase {
  constructor(message = "Um ou mais dados estão incorretos") {
    super(message, 400);
  }
}

export default BadReq;
