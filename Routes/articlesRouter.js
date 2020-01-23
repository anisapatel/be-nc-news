const express = require("express");
const articlesRouter = express.Router();
const {getArticleByArticleId, patchArticleByVotes, postCommentByArticleId, getCommentsByArticleId, getAllArticles} = require("../Controllers/articlesController");

articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id").get(getArticleByArticleId).patch(patchArticleByVotes);
articlesRouter.route("/:article_id/comments").post(postCommentByArticleId).get(getCommentsByArticleId);

module.exports = articlesRouter;

