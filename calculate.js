let calc = {
  sum(n1, n2) {
    return n1 + n2;
  },
  subtract(n1, n2) {
    return n1 - n2;
  },
  divide(n1, n2) {
    return n1 / n2;
  },
  multiply(n1, n2) {
    return n1 * n2;
  },
  percentage(n) {
    return n / 100;
  },
  toggleSign(n) {
    return n == 0 ? n : -n;
  },
};

export function calculate(n, opsId, n2 = 0) {
  let res;
  n = +n;
  n2 = +n2;
  switch (opsId) {
    case `addition`:
      res = calc.sum(n, n2);
      break;
    case `subtraction`:
      res = calc.subtract(n, n2);
      break;
    case `multiplication`:
      res = calc.multiply(n, n2);
      break;
    case `division`:
      res = calc.divide(n, n2);
      break;
    case `percentage`:
      res = calc.percentage(n);
      break;
    case `toggle-sign`:
      res = calc.toggleSign(n);
      break;
    default:
      res = `Error`;
      throw new Error(`No matching operation found for opsId: ${opsId}`);
  }
  return res;
}
