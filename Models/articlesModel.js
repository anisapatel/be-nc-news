const knex = require("../db/connection");

exports.fetchArticleByArticleId = (article_id) => {
    return knex
    .select("*")
    // .from("articles")
    .count({comment_count: "article_id"})
    .from("articles.*")
    .leftJoin("comments", "comments.article_id")
    .groupBy("articles.article_id")
    .where("article_id", "=", article_id)
    .then((article) => {
        console.log(article)
        return article;
    })
}