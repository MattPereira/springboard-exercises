const express = require("express");
const ExpressError = require("./expressErorr");

const app = express();

const { mean, median, mode, convertNumsArray } = require("./operations");

app.get("/mean", (req, res) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "BAD REQUEST: A query key nums with a comma-seperate list of numbers is required",
      400
    );
  }
  let numStringsArr = req.query.nums.split(",");
  let numsArr = convertNumsArray(numStringsArr);
  if (numsArr instanceof Error) {
    throw new ExpressError(numsArr.message, 400);
  }

  let result = {
    operation: "mean",
    value: mean(numsArr),
  };

  return res.json(result);
});

app.get("/median", (req, res) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "BAD REQUEST: A query key nums with a comma-seperate list of numbers is required",
      400
    );
  }
  let numStringsArr = req.query.nums.split(",");
  let numsArr = convertNumsArray(numStringsArr);
  if (numsArr instanceof Error) {
    throw new ExpressError(numsArr.message, 400);
  }

  let result = {
    operation: "median",
    value: median(numsArr),
  };

  return res.json(result);
});

app.get("/mode", (req, res) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "BAD REQUEST: A query key nums with a comma-seperate list of numbers is required",
      400
    );
  }
  let numStringsArr = req.query.nums.split(",");
  let numsArr = convertNumsArray(numStringsArr);
  if (numsArr instanceof Error) {
    throw new ExpressError(numsArr.message, 400);
  }

  let result = {
    operation: "mode",
    value: mode(numsArr),
  };

  return res.json(result);
});

app.get("/all", (req, res) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "BAD REQUEST: A query key nums with a comma-seperate list of numbers is required",
      400
    );
  }
  let numStringsArr = req.query.nums.split(",");
  let numsArr = convertNumsArray(numStringsArr);
  if (numsArr instanceof Error) {
    throw new ExpressError(numsArr.message, 400);
  }

  let result = {
    operation: "all",
    mean: mean(numsArr),
    median: median(numsArr),
    mode: mode(numsArr),
  };

  return res.json(result);
});

//general middleware that is triggered by invalid routes only and sends error through next to error handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

//error handler that is triggered by errors thrown within app.js
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000...");
});
