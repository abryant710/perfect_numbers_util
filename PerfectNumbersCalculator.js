/* 
  This class acts as a utility to find perfect number values
*/
class PerfectNumbersCalculator {
  constructor(config) {
    this.setNewMaximum(config);
  }
  
  setNewMaximum({ max }) {
    this.max = max;
    console.log(`Maximum number set to ${max}`);
    this.integerArr = [...Array(max).keys(), max].splice(1,);
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
}