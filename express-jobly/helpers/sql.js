const { BadRequestError } = require("../expressError");

/**
 * Helper for making partial update queries
 *
 * The function that calls it can use it to make the SET clause
 * of SLQ UPDATE statement and to pass parameter variable values for
 * the parameterized query
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} converts js-style data fields to database column names
 *  like {firstName: "first_name", lastName: "last_name"}
 *  (Only needed if multi-word data field otherwise it will already match
 *  database column name)
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 *  * @example {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
