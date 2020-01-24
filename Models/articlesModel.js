const knex = require("../db/connection");

exports.fetchArticleByArticleId = article_id => {
  return knex
    .select("articles.*")
    .count({ comment_count: "comments.comment_id" })
    .from("articles")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "This article_id does not exist"
        });
      } else {
        return article;
      }
    });
};

exports.updateArticleByVotes = (article_id, { inc_votes = 0 }) => {
  return knex
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .modify(query => {
      if (inc_votes > 0) query.increment("votes", inc_votes);
      if (inc_votes < 0) query.decrement("votes", inc_votes);
    })
    .returning("*")
    .then(updatedArticle => {
      return updatedArticle[0];
    });
};

exports.insertCommentByArticleId = (article_id, commentToFormat) => {
  const commentToPost = {
    article_id,
    author: commentToFormat.username,
    body: commentToFormat.body
  };
  return knex
    .insert(commentToPost)
    .into("comments")
    .returning("*")
    .then(postedComment => {
      return postedComment;
    });
};

exports.fetchCommentsByArticleId = (article_id, { sort_by = "created_at" }) => {
  return knex
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by, "desc")
    .returning("*")
    .then(comments => {
      return comments;
    });
};

exports.fetchAllArticles = ({ username, topic, sort_by = "created_at" }) => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.topic",
      "articles.created_at",
      "articles.votes",
      "articles.author"
    )
    .count({ comment_count: "comments.comment_id" })
    .from("articles")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, "desc")
    .modify(query => {
      if (username) query.where("articles.author", "=", username);
      if (topic) query.where("articles.topic", "=", topic);
    })

    .then(articles => {
      return articles;
    });
};

exports.checkArticleExists = article_id => {
  return knex("articles")
    .select("*")
    .where({ article_id })
    .then(([thing]) => {
      if (!thing)
        return Promise.reject({
          status: 404,
          msg: "This article id does not exist"
        });
    });
};
