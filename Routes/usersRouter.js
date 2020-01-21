const express = require("express");
const usersRouter = express.Router();
const {getUserByUserId} = require("../Controllers/usersController");

usersRouter.route("/:user_id").get(getUserByUserId);

module.exports = usersRouter;

