//inputs: two strings: message and letters

//output: boolean => true if the message can be built with the letters given

//FREQUENCY COUNTER SOLUTION
function constructNote(message, letters) {
  let messageFreq = freqCounter(message);
  let lettersFreq = freqCounter(letters);

  for (let char in messageFreq) {
    //if theres not enough chars in letters or if the char does not exist in letters
    if (messageFreq[char] > lettersFreq[char] || !lettersFreq[char]) {
      return false;
    }
  }

  return true;
}

function freqCounter(str) {
  let obj = {};

  for (let char of str) {
    obj[char] = obj[char] + 1 || 1;
  }

  return obj;
}

module.exports = constructNote;
