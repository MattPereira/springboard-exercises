"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be {title, salary, equity, companyHandle}
   *
   * Returns {id, title, salary, equity, companyHandle}
   */

  static async create({ title, salary, equity, companyHandle }) {
    const result = await db.query(
      `INSERT INTO jobs
                (title, salary, equity, company_handle)
                VALUES ($1, $2, $3, $4)
                RETURNING id, 
                          title, 
                          salary, 
                          equity, 
                          company_handle AS "companyHandle"`,
      [title, salary, equity, companyHandle]
    );
    let job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * searchFilters (all optional):
   * -title (will find case-insensitive, partial matches)
   * -minSalary
   * -hasEquity (true returns only jobs with equity > 0)
   *
   * Returns [{id, title, salary, equity, companyHandle, companyName}, ...]
   */

  static async findAll(searchFilters = {}) {
    let query = `SELECT j.id,
                        j.title,
                        j.salary,
                        j.equity,
                        j.company_handle AS "companyHandle",
                        c.name AS "companyName"
                    FROM jobs AS j
                        LEFT JOIN companies AS c
                        ON j.company_handle = c.handle`;

    let whereExpressions = [];
    let queryValues = [];

    const { title, minSalary, hasEquity } = searchFilters;

    // Add each possible searchFilter key to whereExpressions to generate proper SQL WHERE clause
    // Add each possible searchFilter value to queryValues to generate queryValues array
    // Dynamically set the $1, $2 variables using queryValues.length

    if (minSalary !== undefined) {
      queryValues.push(minSalary);
      whereExpressions.push(`j.salary >= $${queryValues.length}`);
    }

    //hasEquity requires no queryValue, it is only a WHERE expression
    if (hasEquity === true) {
      whereExpressions.push(`j.equity > 0`);
    }

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`j.title ILIKE $${queryValues.length}`);
    }

    // generate SQL syntax for WHERE clause only if searchFilters are present
    if (whereExpressions.length > 0) {
      query = query + " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results
    query += " ORDER BY j.id";

    const jobsRes = await db.query(query, queryValues);

    return jobsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, company }
   *  where company is {handle, name, description, numEmployees, logoUrl} }
   *
   *
   * Throws NotFoundError if not found.
   */

  static async get(id) {
    const jobResult = await db.query(
      `SELECT id,
              title,
              salary,
              equity,
              company_handle AS "companyHandle"
        FROM jobs
        WHERE id=$1`,
      [id]
    );

    const job = jobResult.rows[0];

    if (!job) throw new NotFoundError(`No job with id: ${id}`);

    const compResult = await db.query(
      `SELECT handle,
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoUrl"
        FROM companies
        WHERE handle=$1`,
      [job.companyHandle]
    );
    delete job.companyHandle;
    job.company = compResult.rows[0];

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, companyHandle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id, 
                                    title, 
                                    salary, 
                                    equity, 
                                    company_handle AS "companyHandle"`;

    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job with id: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
                FROM jobs
                WHERE id=$1
                RETURNING id`,
      [id]
    );

    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job with id: ${id}`);
  }
}

module.exports = Job;
