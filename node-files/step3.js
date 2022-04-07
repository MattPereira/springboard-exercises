const fs = require("fs");
const axios = require("axios");
const process = require("process");

//handle writing file if --out , otherwise console.log
function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${out}: \n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

//read file path and console.log
function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`error reading ${path}: \n  ${err}`);
      process.exit(1);
    }
    handleOutput(data, out);
  });
}

//read page at URL and console.log()
async function webCat(url, out) {
  try {
    res = await axios.get(url);
    handleOutput(res.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: \n  ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, out);
} else {
  cat(path, out);
}
