const { fetchAllEndpoints } = require("../endpoints.json");
const { fetchToken } = require("../Models/usersModel");

exports.getAllEndpoints = (req, res, next) => {
  res.status(200).send(fetchAllEndpoints);
};
