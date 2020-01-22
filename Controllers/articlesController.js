const {fetchArticleByArticleId} = require("../Models/articlesModel");

exports.getArticleByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    fetchArticleByArticleId(article_id).then((article) => {
        res.status(200).send({article})
    }).catch(next);
}