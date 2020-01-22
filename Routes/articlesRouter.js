const express = require("express");
const articlesRouter = express.Router();
const {getArticleByArticleId} = require("../Controllers/articlesController");

articlesRouter.route("/:article_id").get(getArticleByArticleId);

module.exports = articlesRouter;

