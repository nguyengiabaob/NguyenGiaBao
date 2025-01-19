// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`
var sum_to_n_a = function (n) {
  let _sum = 0;

  if (n == 0) {
    return `sum_to_n(${n})=== 0 === 0`;
  }
  if (n < 0) {
    return `n must larger than 0`;
  }
  for (let i = 1; i <= n; i++) {
    _sum += i;
  }
  return `sum_to_n(${n}) = ${_sum}`;
};

var sum_to_n_b = function (n) {
  // your code here
  if (n < 0) {
    return `n must larger than 0`;
  }
  let _sum = (n * (n + 1)) / 2;
  return `sum_to_n(${n}) = ${_sum}`;
};

var sum_to_n_c = function (n) {
  // your code here

  if (n < 0) {
    return `n must larger than 0`;
  }
  let _sum = Array.from({ length: n }, (_, i) => i + 1).reduce(
    (prev, current) => prev + current,
    0
  );
  return `sum_to_n(${n}) = ${_sum}`;
};

let _resultA = sum_to_n_a(20);
let _resultB = sum_to_n_b(20);
let _resultC = sum_to_n_c(20);
console.log(_resultA);
console.log(_resultB);
console.log(_resultC);
