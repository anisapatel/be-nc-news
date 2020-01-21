const express = require("express");
const topicsRouter = express.Router();
const {getAllTopics} = require("../Controllers/topicsController")

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;