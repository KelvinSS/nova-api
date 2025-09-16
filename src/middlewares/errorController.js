import mongoose from "mongoose";
import ErrorBase from "../error/ErrorBase.js";
import BadReq from "../error/BadReq.js";
import ValidationError from "../error/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errorController(error, req, res, next) {
  console.log(error);

  if (error instanceof mongoose.Error.CastError) {
    new BadReq().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof ErrorBase) {
    error.sendResponse(res);
  } else {
    new ErrorBase().sendResponse(res);
  }
}

export default errorController;
