const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const db = require("../db");
const slugify = require("slugify");

// Get a list of companies
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT code,name FROM companies ORDER BY name`
    );
    return res.json({ companies: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Get details on one particular company
router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;

    const compQuery = db.query(
      `SELECT code, name, description
      FROM companies 
      WHERE code = $1`,
      [code]
    );

    const invQuery = db.query(
      `SELECT id 
      FROM invoices 
      WHERE comp_code=$1`,
      [code]
    );

    const indQuery = db.query(
      `SELECT * FROM companies_industries AS ci 
      JOIN industries AS i 
      ON ci.industry_code = i.code 
      WHERE company_code = $1`,
      [code]
    );

    [compResult, invResult, indResult] = await Promise.all([
      compQuery,
      invQuery,
      indQuery,
    ]);

    if (compResult.rows.length === 0) {
      throw new ExpressError(`Could not find company with code: ${code}`, 404);
    }
    const company = compResult.rows[0];
    const invoices = invResult.rows.map((inv) => inv.id);
    const industries = indResult.rows.map((ind) => ind.name);

    company.invoices = invoices;
    company.industries = industries;

    return res.json({ company: company });
  } catch (e) {
    return next(e);
  }
});

// add a new company to db
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const code = slugify(name, { lower: true, replacement: "-" });

    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING code, name, description`,
      [code, name, description]
    );
    return res.status(201).json({ company: result.rows[0] });
  } catch (e) {
    return next(e);
  }
});

// Update name and description of a company
router.put("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;

    const result = await db.query(
      `UPDATE companies 
      SET name = $1, description = $2 
      WHERE code = $3 
      RETURNING code, name, description`,
      [name, description, code]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`Could not find company with code ${code}`, 404);
    }

    return res.json({ company: result.rows[0] });
  } catch (e) {
    next(e);
  }
});

// Delete a company
router.delete("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      `DELETE FROM companies 
      WHERE code = $1 
      RETURNING code`,
      [code]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`Could not find company with code: ${code}`, 404);
    }
    return res.json({ status: "deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
