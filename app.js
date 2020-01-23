const express = require("express");
const app = express();
const apiRouter = require("./Routes/apiRouter");
app.use(express.json());
const {handle404s, handle500s, handlePsqlErrors, handleInvalidRoutes, handle422s} = require("./Errors/errors")

app.use("/api", apiRouter);
app.use(handle404s);
app.use(handlePsqlErrors);
app.use(handle422s);
app.use(handleInvalidRoutes);
app.use(handle500s);


app.all('/*', (req, res, next) =>
  next({ status: 404, msg: 'Route not found' })
);

module.exports = app;
