//input: two arrays of varying lenghts
//1st array: all keys
//2nd array: all values

//output: an object created from the keys and values
//more keys than values ? set the keys value to null
//more values than keys ? ignore the leftover values

// function twoArrayObject(keys, values) {
//   //declare object to accumulate key/value pairs
//   let obj = {};

//   for (let i = 0; i < keys.length; i++) {
//     obj[keys[i]] = values[i] ? values[i] : null;
//   }

//   //return the finished object
//   return obj;
// }

function twoArrayObject(keys, values) {
  return keys.reduce((acc, cur, idx) => {
    acc[cur] = idx < values.length ? values[idx] : null;
    return acc;
  }, {});
}

module.exports = twoArrayObject;
