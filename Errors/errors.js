exports.handle404s = (req, res, next) => {
    res.status(404).send({msg: 'Route not found'});
  };

exports.handle500s = (err, req, res, next) => {
    if (err) console.log(err);
  res.status(500).send({ msg: "Internal Server Error!" });
  };
  