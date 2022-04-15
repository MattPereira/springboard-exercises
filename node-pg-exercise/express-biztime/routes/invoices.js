const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

const router = new express.Router();

// Get list of invoices
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, comp_code 
      FROM invoices 
      ORDER BY id`
    );

    return res.json({ invoices: result.rows });
  } catch (e) {
    next(e);
  }
});

//Get details about a particular invoice
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    const result = await db.query(
      `SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description
           FROM invoices AS i 
             JOIN companies as c on (i.comp_code = c.code)
           WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError(`Could not find invoice with id ${id}`, 404);
    }

    const data = result.rows[0];

    const invoice = {
      id: data.id,
      company: {
        code: data.comp_code,
        name: data.name,
        description: data.description,
      },
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
    };

    return res.json({ invoice: invoice });
  } catch (e) {
    return next(e);
  }
});

// Create a new invoice
router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const result = await db.query(
      `INSERT INTO invoices (comp_code, amt) 
       VALUES ($1, $2) 
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt]
    );

    return res.status(201).json({ invoice: result.rows[0] });
  } catch (e) {
    return next(e);
  }
});

// Update the amount of an invoice
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt, paid } = req.body;
    let paidDate = null;

    //Query db to determine paid status
    const currResult = await db.query(
      `SELECT paid, paid_date FROM invoices WHERE id=$1`,
      [id]
    );

    if (currResult.rows.length === 0) {
      throw new ExpressError(`No invoice with id ${id}`, 404);
    }

    const currPaidDate = currResult.rows[0].paid_date;

    // if paid_date: null && req.body.paid : true
    if (!currPaidDate && paid) {
      //if paying unpaid invoice: set paid_date to today
      paidDate = new Date();
    } else if (!paid) {
      // un-paying : set paid_date to null
      paidDate = null;
    } else {
      // keep current paid_date
      paidDate = currPaidDate;
    }

    //update invoice properties
    const result = await db.query(
      `UPDATE invoices SET amt = $1, paid=$2, paid_date=$3 WHERE id = $4 RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [amt, paid, paidDate, id]
    );

    return res.json({ invoice: result.rows[0] });
  } catch (e) {
    next(e);
  }
});

// Delete an invoice
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `DELETE FROM invoices 
           WHERE id=$1 
           RETURNING id`,
      [id]
    );

    if (result.rowCount === 0) {
      throw new ExpressError(`Could not find company with id: ${id}`, 404);
    }

    return res.json({ status: "deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
