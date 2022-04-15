const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const db = require("../db");

// Get a list of industries WITH COMPANY CODES ASSOCIATED
router.get("/", async (req, res, next) => {
  try {
    const indResult = await db.query(
      `SELECT i.code, i.name FROM industries AS i`
    );

    const compIndResult = await db.query(
      `SELECT company_code, industry_code FROM companies_industries;`
    );

    const industries = indResult.rows;

    const compInds = compIndResult.rows;

    industries.map((i) => {
      i.company_codes = [];
      for (let obj of compInds) {
        if (obj["industry_code"] === i.code) {
          i.company_codes.push(obj["company_code"]);
        }
      }
    });

    return res.json({ industries: industries });
  } catch (e) {
    return next(e);
  }
});

// Adding a new industry
router.post("/", async (req, res, next) => {
  try {
    const { code, name } = req.body;
    const result = await db.query(
      `INSERT INTO industries (code, name) VALUES ($1, $2) RETURNING code, name`,
      [code, name]
    );

    return res.status(201).json({ industry: result.rows[0] });
  } catch (e) {
    return next(e);
  }
});

// Associate an industry to a company
router.post("/company", async (req, res, next) => {
  try {
    const { company_code, industry_code } = req.body;

    const result = await db.query(
      `INSERT INTO companies_industries (company_code, industry_code)
    VALUES ($1, $2)
    RETURNING company_code, industry_code`,
      [company_code, industry_code]
    );

    return res.status(201).json({ company_industry: result.rows[0] });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
