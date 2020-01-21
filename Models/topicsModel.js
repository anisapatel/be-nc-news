const knex = require("../db/connection");

exports.fetchAllTopics = () => {
    return knex
    .from("topics")
    .select("*")
}