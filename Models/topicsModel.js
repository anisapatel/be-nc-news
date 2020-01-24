const knex = require("../db/connection");

exports.fetchAllTopics = () => {
  return knex.from("topics").select("*");
};

exports.checkTopicExists = topic => {
  return knex("topics")
    .select("*")
    .where("slug", topic)
    .then(([thing]) => {
      if (!thing)
        return Promise.reject({
          status: 404,
          msg: "This topic does not exist"
        });
    });
};
