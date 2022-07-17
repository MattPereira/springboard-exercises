// input: two strings

// output: boolean, true or false

function isSubsequence(str1, str2) {
  //declare two pointers starting at 0 index of each string
  let str1Idx = 0;
  let str2Idx = 0;

  if (!str1) return true;

  while (str2Idx < str2.length) {
    if (str1[str1Idx] === str2[str2Idx]) {
      str1Idx += 1;
      str2Idx += 1;
    } else {
      str2Idx += 1;
    }

    //if pointer gets past all the idx's of str1
    if (str1Idx === str1.length) return true;
  }

  return false;
}

module.exports = isSubsequence;
