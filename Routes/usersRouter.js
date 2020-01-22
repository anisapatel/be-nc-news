const express = require("express");
const usersRouter = express.Router();
const {getUserByUsername} = require("../Controllers/usersController");

usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;

