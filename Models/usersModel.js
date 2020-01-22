const knex = require("../db/connection");

exports.fetchUserByUserId = (user_id) => {
    return knex
    .select("*")
    .from("users")
    .where("user_id", "=", user_id)
    .returning("*")
    .then((user) => {
        if(user.length === 0) {
            return Promise.reject({status: 404, msg: "This user_id does not exist"})
        } else {
            return user;
        }
    })
}