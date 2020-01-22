const {fetchArticleByArticleId, updateArticleByVotes, insertCommentByArticleId} = require("../Models/articlesModel");

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
    const commentToPost = req.body;
    insertCommentByArticleId(article_id, commentToPost).then((postedComment) => {
        res.status(200).send({postedComment})
    }).catch(next);
}