/* 
  This class acts as a utility to find perfect number values
*/
class PerfectNumbersCalculator {
  constructor(config) {
    this.setNewMaximum(config);
  }

  getNonPrimesBelow(max) {
    const gen = this._generatePrimes(false);
    let curCount = 4;
    const integerArr = []; // Only add non-primes to this array
    while (curCount <= max) {
      curCount = gen.next().value;
      integerArr.push(curCount);
    }
    integerArr.pop();
    return integerArr;
  }

  * _generatePrimes(getPrimes = true) { // False generates non-primes array
    const markedNotPrimeMap = new Map();
    let valueToCheck = 2;
    while(true) {
        if (!(markedNotPrimeMap.has(valueToCheck))) {
            if (getPrimes) yield valueToCheck
            markedNotPrimeMap.set(valueToCheck**2, [valueToCheck])
        } else {
            let primes =markedNotPrimeMap.get(valueToCheck)
            primes.forEach(prime=> {
                let nextMultipleOfPrime = prime + valueToCheck;
                if (markedNotPrimeMap.has(nextMultipleOfPrime)) {
                    markedNotPrimeMap.get(nextMultipleOfPrime).push(prime);
                } else {
                    markedNotPrimeMap.set(nextMultipleOfPrime, [prime]);
                }
            })
            markedNotPrimeMap.delete(valueToCheck);
            if (!getPrimes) yield valueToCheck
        }
        valueToCheck += 1
    }
  }
  
  setNewMaximum({ max }) {
    this.max = max;
    console.log(`Maximum number set to ${max}`);
    this.integerArr = this.getNonPrimesBelow(max);
  }
  
  _getTimeDiff(startTime) {
    const timeNow = new Date();
    return ((timeNow - startTime) / 1000).toFixed(2);
  }
  
  checkIfPerfect(num, log = true) {
    const divisors = this.getDivisors(num)
    const sum = divisors.reduce(
      ((total, currentValue) => total + currentValue), 0
    );
    if (sum === num) {
      if (log) console.log(`Number ${num} is perfect!`);
      return true;
    }
    if (log) console.log(`Number ${num} is not perfect.`);
    return false;
  }
  
  getDivisors(num) {
    let count = 1;
    const divisors = [];
    while(count < num) {
      if (Number.isInteger(num / count)) divisors.push(count);
      count++;
      if(count > num/2) break; // Over half is not a divisor
    }
    return divisors;
  }
  
  findPerfects() {
    const startTime = new Date();
    const perfectNums = []; // Store results in an array
    this.integerArr.forEach(number => {
      if (number % (this.max / 100) === 0) {
        console.log(
          `On number ${number}. ${100*number / this.max}% done.`
          + ` Time taken: ${this._getTimeDiff(startTime)}s`
        );
      }
      const perf = this.checkIfPerfect(number, false); 
      if (perf) perfectNums.push(number);
    });
    // Print the results
    console.log(`100% done in ${this._getTimeDiff(startTime)}s.`
    + ` Result: [${perfectNums. join(', ')}].`);
  }
};