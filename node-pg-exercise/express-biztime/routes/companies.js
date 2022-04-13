const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const db = require("../db");

// Get a list of companies
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM companies`);
    return res.json({ companies: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Get details on one particular company
router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const compResult = await db.query(
      `SELECT * FROM companies WHERE code = $1`,
      [code]
    );

    const invResult = await db.query(
      `SELECT * FROM invoices WHERE comp_code=$1`,
      [code]
    );

    if (compResult.rows.length === 0) {
      throw new ExpressError(`Could not find company with code: ${code}`, 404);
    }
    const company = compResult.rows[0];
    const invoices = invResult.rows;

    return res.json({ company: company, invoices: invoices });
  } catch (e) {
    return next(e);
  }
});

// add a new company to db
router.post("/", async (req, res, next) => {
  try {
    const { code, name, description } = req.body;
    const result = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`,
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
      `UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description`,
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

    const result = await db.query(`DELETE FROM companies WHERE code = $1`, [
      code,
    ]);

    if (result.rowCount === 0) {
      throw new ExpressError(`Could not find company with code: ${code}`, 404);
    }
    return res.json({ status: "deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
