const {fetchUserByUserId} = require("../Models/usersModel");

exports.getUserByUserId = (req, res, next) => {
    console.log(req.query)
    const {user_id} = req.query
    fetchUserByUserId(user_id).then((user) => {
        res.status(200).send({user})
    }).catch(next)
}