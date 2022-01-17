//QUESTION 1
new Set([1, 1, 2, 2, 3, 4]);
// Set(4) {1,2,3,4}

//QUESTION 2
[...new Set("referee")].join("");
// 'ref'

//QUESTION 3
let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);
//Map(2) {[1,2,3] => true, [1,2,3] => false}

const hasDuplicate = (array) => new Set(array).size !== array.length;

const vowelCount = (string) => {
  const isVowel = (letter) => "aeiou".includes(letter);
  const vowelMap = new Map();
  string = string.toLowerCase();

  for (let char of string) {
    if (isVowel(char)) {
      if (vowelMap.has(char)) {
        vowelMap.set(char, vowelMap.get(char) + 1);
      } else {
        vowelMap.set(char, 1);
      }
    }
  }
  return vowelMap;
};
