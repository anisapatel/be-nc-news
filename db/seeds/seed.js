
const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');


const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  return knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => {
    const topicsInsertions = knex('topics').insert(topicData).returning("*");
    const usersInsertions = knex('users').insert(userData).returning("*");
    return Promise.all([topicsInsertions, usersInsertions])
  })
  .then((array) => {
    let insertedTopics = array[0];
    let insertedUsers = array[1];

  let formattedDates = formatDates(articleData);
  return knex('articles').insert(formattedDates).returning('*');
  
})

      .then(insertedArticles => {
     
      const articleRef = makeRefObj(insertedArticles, 'title', 'article_id');
      const keyToRename = ["created_by", "belongs_to"];
      const keyToInsert = ["author", "article_id"];
      const formattedComments = formatComments(commentData, keyToRename, keyToInsert, articleRef);
      return knex('comments').insert(formattedComments).returning("*");


    }).then((insertedFormattedComments) => {
      return insertedFormattedComments;
     
    })
};
