const express = require("express");
const commentsRouter = express.Router();
const {patchCommentByCommentId, deleteCommentByCommentId} = require("../Controllers/commentsController");
const {handleInvalidMethods} = require("../Errors/errors");

commentsRouter.route("/:comment_id").patch(patchCommentByCommentId).delete(deleteCommentByCommentId).all(handleInvalidMethods);

module.exports = commentsRouter;