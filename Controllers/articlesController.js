const {fetchArticleByArticleId, updateArticleByVotes, insertCommentByArticleId, fetchCommentsByArticleId, fetchAllArticles} = require("../Models/articlesModel");

exports.getArticleByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    fetchArticleByArticleId(article_id).then((article) => {
        res.status(200).send({article})
    }).catch(next);
}

exports.patchArticleByVotes = (req, res, next) => {
    const { article_id } = req.params;
    const voteToPatch = req.body;
    updateArticleByVotes(article_id, voteToPatch ).then((updatedArticle) => {
        res.status(200).send({updatedArticle})
    }).catch(next);
}

exports.postCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const commentToFormat = req.body;
    insertCommentByArticleId(article_id, commentToFormat).then((postedComment) => {
        res.status(201).send({postedComment})
    }).catch(next);
}

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const sort_by = req.query;
    fetchCommentsByArticleId(article_id, sort_by).then((comments) => {
        res.status(200).send({comments})
    }).catch(next);
}


exports.getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query).then((articles) => {
        res.status(200).send({articles})
    }).catch(next);
}