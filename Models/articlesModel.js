const knex = require("../db/connection");

exports.fetchArticleByArticleId = (article_id) => {
    return knex
    .select("articles.*")
    .count({comment_count: "comments.comment_id"})
    .from("articles")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id)
    .then((article) => {
        if(article.length === 0) {
            return Promise.reject({status: 404, msg: "This article_id does not exist"})
        } else {
            return article;
        }
    })
}

exports.updateArticleByVotes = (article_id, voteToPatch) => {
    return knex
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .increment('votes', voteToPatch.inc_votes)
    .returning("*")
    .then(updatedArticle => {
         return updatedArticle[0];
    });
}

exports.insertCommentByArticleId = (article_id, commentToPost) => {
    console.log(article_id)
    console.log(commentToPost)
    return knex
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .insert(commentToPost)
    .into('comments')
    .then((postedComment) => {
        console.log(postedComment)
    })
}