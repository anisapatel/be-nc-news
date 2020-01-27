const knex = require("../db/connection");

exports.fetchAllTopics = () => {
  return knex
    .from("topics")
    .select("*")
    .then(topics => {
      if (topics.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No topics have been returned"
        });
      } else {
        return topics;
      }
    });
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
