const {fetchUserByUserId} = require("../Models/usersModel");

exports.getUserByUserId = (req, res, next) => {
    const {user_id} = req.params;
    fetchUserByUserId(user_id).then((user) => {
        res.status(200).send({user})
    }).catch(next);
};