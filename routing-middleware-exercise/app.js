const express = require("express");
const app = express();

const ExpressError = require("./expressError");

const itemsRoutes = require("./routes/items");

app.use(express.json());
app.use("/items", itemsRoutes);

//404 handler
app.use((req, res) => {
  return new ExpressError("Not Found", 404);
});

//generic error handler
app.use(function (err, req, res, next) {
  let status = err.status || 500;

  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
