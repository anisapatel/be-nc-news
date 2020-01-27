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
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentToFormat = req.body;
  insertCommentByArticleId(article_id, commentToFormat)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    fetchCommentsByArticleId(article_id, req.query),
    checkArticleExists(article_id)
  ])
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const promises = [fetchAllArticles(req.query)];
  if (req.query.author) promises.push(checkUserExists(req.query.author));
  if (req.query.topic) promises.push(checkTopicExists(req.query.topic));
  Promise.all(promises)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
