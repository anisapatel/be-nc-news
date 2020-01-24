exports.handlePsqlErrors = (err, req, res, next) => {
    const psqlCodes = ['22P02', '23502', '42703'];
    if (psqlCodes.includes(err.code)) {
        res.status(400).send({msg: "BAD REQUEST"})
    } else {
        next(err)
    }
}

exports.handleInvalidRoutes = (req, res, next) => {
    res.status(404).send({msg: "Path not found"})
}

exports.handle404s = (err, req, res, next) => {
    if (err.status) {
    res.status(err.status).send({msg: err.msg})
    } else next(err)
};

exports.handle422s = (err, req, res, next) => {
    const psqlCodes = ['23503'];
    if(psqlCodes.includes(err.code)) {
        res.status(422).send({ msg: "unprocessable post" });
    } else {
        next(err)
    }
};
  
exports.handle500s = (err, req, res, next) => {
      if (err) console.log(err);
      res.status(500).send({ msg: "Internal Server Error!" });
};
    
exports.handleInvalidMethods = (req, res, next) => {
    res.status(405).send({ msg: "Invalid method." });
};
