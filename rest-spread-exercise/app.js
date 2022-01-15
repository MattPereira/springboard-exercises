const filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0);

const findMin = (...numbers) => Math.min(...args);

const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

const doubleAndReturnArgs = (array, ...nums) => [
  ...array,
  ...nums.map((num) => num * 2),
];

/** remove a random element in the items array
and return a new array without that item. */

const colors = ["blue", "green", "red"];

const removeRandom = (items) => {
  let itemsCopy = [...items];
  let random = Math.floor(Math.random() * items.length);
  itemsCopy.splice(random, 1);
  return itemsCopy;
};

/** Return a new array with every item in array1 and array2. */

const shapes = ["square", "triangle", "circle"];

const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const miata = {
  year: 2017,
  color: "white",
  transmission: "manual",
};

const miataSounds = {
  start: "vroom",
  wot: "waaahhhhh",
  drift: "skeeeee",
};

const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });

/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
  const objCopy = { ...obj };
  delete objCopy[key];
  return objCopy;
};

/** Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });

/** Return a new object with a modified key and value. */

const update = (obj, key, val) => ({ ...obj, [key]: val });
