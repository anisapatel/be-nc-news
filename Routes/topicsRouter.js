const express = require("express");
const topicsRouter = express.Router();
const {getAllTopics} = require("../Controllers/topicsController");
const {handleInvalidMethods} = require("../Errors/errors")

topicsRouter.route("/").get(getAllTopics).all(handleInvalidMethods);

module.exports = topicsRouter;