const express = require("express");
const articlesRouter = express.Router();
const {getArticleByArticleId, patchArticleByVotes, postCommentByArticleId} = require("../Controllers/articlesController");

articlesRouter.route("/:article_id").get(getArticleByArticleId).patch(patchArticleByVotes);
articlesRouter.route("/:article_id/comments").post(postCommentByArticleId);

module.exports = articlesRouter;

