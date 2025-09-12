import NotFound from "../error/NotFound.js";

 
function controller404(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default controller404;
