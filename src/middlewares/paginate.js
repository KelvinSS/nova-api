import BadReq from "../error/BadReq.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, orderFild = "_id:-1" } = req.query;

    let [sortField, order] = orderFild.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const resultPaginate = await result
        .find()
        .sort({ [sortField]: order })
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(resultPaginate);
      //res.status(200).json(await books.find().skip((page - 1) * limit).limit(limit).populate("author"));
    } else {
      next(new BadReq());
    }
  } catch (error) {
    next(error);
  }
}

export default paginate;
