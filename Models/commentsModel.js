const knex = require("../db/connection");

exports.updateCommentByCommentId = (comment_id, { inc_votes = 0 }) => {
  return knex
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "This comment id has not sent back any comments"
        });
      } else {
        return comment;
      }
    });
};

exports.removeCommentByCommentId = comment_id => {
  return knex
    .select("*")
    .from("comments")
    .where({ comment_id })
    .del();
};
