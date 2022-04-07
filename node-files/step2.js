const fs = require("fs");
const axios = require("axios");
const process = require("process");

//read file path and console.log
function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`error reading ${path}: \n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

//read page at URL and console.log()
async function webCat(url) {
  try {
    res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetching ${url}: \n  ${err}`);
    process.exit(1);
  }
}

let arg = process.argv[2];

if (arg.slice(0, 4) === "http") {
  webCat(arg);
} else {
  cat(arg);
}
