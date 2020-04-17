# Perfect numbers

Please refer to my article on [Medium](https://medium.com/@abryant710/calculating-perfect-numbers-c7d8967a47e5).

## Example

```
const perfectNumsCalc = new PerfectNumbersCalculator({max: 100});
perfectNumsCalc.findPerfects(); // Result: [6, 28]
perfectNumsCalc.setNewMaximum({max: 10000});
perfectNumsCalc.findPerfects(); // Result: [6, 28, 496, 8128]
perfectNumsCalc.checkIfPerfect(777); // false
perfectNumsCalc.checkIfPerfect(33550336); // true
```