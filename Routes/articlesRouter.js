const express = require("express");
const articlesRouter = express.Router();
const {getArticleByArticleId, patchArticleByVotes, postCommentByArticleId, getCommentsByArticleId, getAllArticles} = require("../Controllers/articlesController");
const {handleInvalidMethods} = require("../Errors/errors")

articlesRouter.route("/").get(getAllArticles).all(handleInvalidMethods);
articlesRouter.route("/:article_id").get(getArticleByArticleId).patch(patchArticleByVotes).all(handleInvalidMethods);
articlesRouter.route("/:article_id/comments").post(postCommentByArticleId).get(getCommentsByArticleId).all(handleInvalidMethods);

module.exports = articlesRouter;

