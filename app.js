const express = require("express");
const app = express();
const apiRouter = require("./Routes/apiRouter");
app.use(express.json());
const {handle404s, handle500s, handlePsqlErrors, handleInvalidRoutes, handle422s, handleInvalidMethods} = require("./Errors/errors")

app.use("/api", apiRouter);
app.use(handlePsqlErrors);
app.all("/*", handleInvalidRoutes);
app.use(handle404s);
app.use(handle422s);
app.use(handle500s);




module.exports = app;
