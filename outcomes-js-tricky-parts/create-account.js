function createAccount(pin, amount) {
  let balance = amount || 0;
  let pinNum = pin;

  return {
    checkBalance: function (pin) {
      if (pin !== pinNum) return `Invalid PIN.`;
      return `$${balance}`;
    },
    deposit: function (num, depositAmount) {
      if (num !== pinNum) return `Invalid PIN.`;
      balance += depositAmount;
      return `Succesfully deposited $${depositAmount}. Current balance: $${balance}.`;
    },
    withdraw: function (pin, withdrawAmount) {
      if (pin !== pinNum) return `Invalid PIN.`;
      if (withdrawAmount > balance)
        return `Withdrawal amount exceeds account balance. Transaction cancelled.`;
      balance -= withdrawAmount;
      return `Succesfully withdrew $${withdrawAmount}. Current balance: $${balance}.`;
    },
    changePin: function (pin, newPin) {
      if (pin !== pinNum) reeturn`Invalid PIN.`;
      pinNum = newPin;
      return `PIN successfully changed!`;
    },
  };
}

module.exports = { createAccount };
