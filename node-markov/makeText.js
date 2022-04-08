/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// create a new markov machine and console.log the generated text
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

// read file and generate text from it

function makeText(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Cannot read file: ${path}:`);
      console.log(err);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

//read URL and make text from it
async function makeUrlText(url) {
  let res;

  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(`Cannot read URL: ${url}:`);
    console.log(err);
    process.exit(1);
  }
  generateText(res.data);
}

let [method, path] = process.argv.slice(2);

console.log(process.argv.slice(2));

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeUrlText(path);
} else {
  console.log(error(`Unknown method: ${method}`));
  process.exit(1);
}
