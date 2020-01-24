const express = require("express");
const usersRouter = express.Router();
const {getUserByUsername} = require("../Controllers/usersController");
const {handleInvalidMethods} = require("../Errors/errors");

usersRouter.route("/:username").get(getUserByUsername).all(handleInvalidMethods);

module.exports = usersRouter;

