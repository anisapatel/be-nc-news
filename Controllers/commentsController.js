const {updateCommentByCommentId, removeCommentByCommentId} = require("../Models/commentsModel");

exports.patchCommentByCommentId = (req, res, next) => {
    const {comment_id} = req.params; 
    updateCommentByCommentId(comment_id, req.body).then((updatedComment) => {
        res.status(200).send({updatedComment})
    }).catch(next)
}

exports.deleteCommentByCommentId = (req, res, next) => {
    const {comment_id} = req.params;
    removeCommentByCommentId(comment_id).then(() => {
        res.sendStatus(204)
    }).catch(next)
}