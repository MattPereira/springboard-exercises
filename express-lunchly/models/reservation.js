/** Reservation for Lunchly */

const moment = require("moment");

const db = require("../db");

/** A reservation for a party */

class Reservation {
  constructor({ id, customerId, numGuests, startAt, notes }) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  /** methods for getting/setting number of guests */

  set numGuests(val) {
    if (val < 1) throw new Error("Cannot have fewer than 1 guest.");
    this._numGuests = val;
  }

  get numGuests() {
    return this._numGuests;
  }

  /** methods for setting/getting startAt time */

  set startAt(val) {
    if (val instanceof Date && !isNaN(val)) {
      this._startAt = val;
    } else throw new Error("Not a valid startAt.");
  }

  get startAt() {
    return this._startAt;
  }

  /** formatter for startAt */

  get formattedStartAt() {
    return moment(this.startAt).format("MMMM Do YYYY, h:mm a");
  }

  /** methods for setting/getting notes (keep as a blank string, not NULL) */

  set notes(val) {
    this._notes = val || "";
  }

  get notes() {
    return this._notes;
  }

  /** methods for setting/getting customer ID: can only set once. */

  set customerId(val) {
    if (this._customerId && this._customerId !== val)
      throw new Error("Cannot change customer ID");
    this._customerId = val;
  }

  get customerId() {
    return this._customerId;
  }

  /** get a reservation by ID. */
  static async get(id) {
    const results = await db.query(
      `SELECT id, 
        customer_id AS "customerId",
        num_guests AS "numGuests",
        start_at AS "startAt",
        notes
        FROM reservations
        WHERE id = $1`,
      [id]
    );
    const reservation = results.rows[0];

    if (reservation === undefined) {
      const err = new Error(`No such reservation: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Reservation(reservation);
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
      `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
      [customerId]
    );

    return results.rows.map((row) => new Reservation(row));
  }

  /** save a reservation */
  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO reservations (customer_id, start_at, num_guests, notes)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
        [this.customerId, this.startAt, this.numGuests, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE reservations SET num_guests = $1, start_at = $2, notes = $3
        WHERE id = $4`,
        [this.numGuests, this.startAt, this.notes, this.id]
      );
    }
  }
}

module.exports = Reservation;
