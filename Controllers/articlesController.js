const {
  fetchArticleByArticleId,
  updateArticleByVotes,
  insertCommentByArticleId,
  fetchCommentsByArticleId,
  fetchAllArticles,
  checkArticleExists
} = require("../Models/articlesModel");
const { checkUserExists } = require("../Models/usersModel");
const { checkTopicExists } = require("../Models/topicsModel");

exports.getArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleByVotes = (req, res, next) => {
  const { article_id } = req.params;
  const voteToPatch = req.body;
  updateArticleByVotes(article_id, voteToPatch)
    .then(updatedArticle => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentToFormat = req.body;
  insertCommentByArticleId(article_id, commentToFormat)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const sort_by = req.query;
  Promise.all([
    fetchCommentsByArticleId(article_id, sort_by),
    checkArticleExists(article_id)
  ])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const promises = [fetchAllArticles(req.query)];
  if (req.query.username) promises.push(checkUserExists(req.query.username));
  if (req.query.topic) promises.push(checkTopicExists(req.query.topic));
  Promise.all(promises)
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
