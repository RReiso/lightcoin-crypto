class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
    this.balance = 0; // call to setter method
  }

  get balance() {
    return this._balance;
  }

  set balance(amount) {
    this._balance = amount;
  }

  addTransaction(transaction) {
    const amount = transaction.value;
    if (this.balance + amount >= 0) {
      this.transactions.push(transaction);
      this.balance += amount; //(this.balance = (this.balance(call to getter) + amount) - call to setter
    } else {
      console.log("Insufficient funds");
    }
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

// DRIVER CODE BELOW

const myAccount = new Account('somebody');
console.log('Balance:', myAccount.balance);
console.log("-----------------");

const t1 = new Deposit(120.00, myAccount);
console.log("deposit: ", t1.amount);
t1.commit();
console.log('Balance:', myAccount.balance);
console.log("-----------------");

const t2 = new Withdrawal(100.00, myAccount);
console.log("withdraw: ", t2.amount);
t2.commit();
console.log('Balance:', myAccount.balance);
console.log("-----------------");

const t3 = new Withdrawal(260.00, myAccount);
console.log("trying to withdraw: ", t3.amount);
t3.commit();
console.log('Balance:', myAccount.balance);
console.log("-----------------");
