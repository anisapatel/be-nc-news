const knex = require("../db/connection");

exports.updateCommentByCommentId = (comment_id, {inc_votes = 0}) => {
    return knex
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .modify(query => {
        if(inc_votes > 0) query.increment('votes', inc_votes)
        if(inc_votes < 0) query.decrement("votes", inc_votes)
    })
    .returning("*")
    .then((updatedComment) => {
        return updatedComment;
    })
}

exports.removeCommentByCommentId = (comment_id) => {
    return knex
    .select("*")
    .from("comments")
    .where({comment_id})
    .del()
}