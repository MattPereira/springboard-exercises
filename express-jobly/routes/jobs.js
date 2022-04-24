"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureIsAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const jobs = await Job.findAll();

    return res.json({ jobs });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const job = await Job.get(req.params.id);
    return res.json({ job });
  } catch (e) {
    return next(e);
  }
});
module.exports = router;
