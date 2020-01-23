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

exports.insertCommentByArticleId = (article_id, commentToFormat) => {
    const commentToPost = {article_id, author: commentToFormat.username, body: commentToFormat.body}
    return knex
    .insert(commentToPost)
    .into('comments')
    .returning("*")
    .then((postedComment) => {
        return postedComment;
    })
}

exports.fetchCommentsByArticleId = (article_id, {sort_by = "created_at"}) => {
    return knex
    .select("*")
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by, "desc")
    .returning("*")
    .then((comments) => {
        return comments;
    })
}

exports.fetchAllArticles = (username, {sort_by = "created_at"}) => {
    console.log(username)
    return knex
    .select("articles.*")
    .count({comment_count: "comments.comment_id"})
    .from("articles")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, "desc")
    .returning("*")
    .then((articles) => {
        console.log(articles)
    })
}

