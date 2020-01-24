const knex = require("../db/connection");

exports.fetchUserByUsername = username => {
  return knex
    .from("users")
    .select("*")
    .where("users.username", "=", username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "This username does not exist"
        });
      }
      return user;
    });
};

exports.checkUserExists = username => {
  return knex("users")
    .select("*")
    .where({ username })
    .then(([thing]) => {
      if (!thing)
        return Promise.reject({
          status: 404,
          msg: "This username does not exist"
        });
    });
};
