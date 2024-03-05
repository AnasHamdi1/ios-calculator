import { calculate } from "./calculate.js";
import { trapFocus } from "./trap-focus.js";

// DOM elements variables
const calcEl = document.querySelector(`.calc`);
const resultEl = document.querySelector(`.calc .result`);
const numbers = document.querySelectorAll(`.calc .number`);
const ops = document.querySelectorAll(
  `.calc .main-ops:not(#equals), .calc #percentage, .calc #toggle-sign`
);
const AC = document.getElementById(`ac`);
const equals = document.getElementById(`equals`);

// global variables
let firstNum = ``;
let lastNum = ``;
let operator = null;
let lastResult = 0;
let resMaxLen = 9;

trapFocus(calcEl);
fitResultToContainer();

AC.addEventListener(`click`, handleAC);

document.addEventListener(`keydown`, handleCalcKeydown);

numbers.forEach((numEl) => {
  numEl.addEventListener(`click`, function () {
    let num = numEl.dataset.num;
    let resTextContent = resultEl.textContent;
    let resValue = resTextContent.split(/[,.]/).join(``);

    AC.innerText = `C`;

    if (num === "." && resTextContent.includes(".")) return;

    if (/^0+$/.test(resTextContent) && num === "0") return;

    // if (num === "." && resTextContent === "0") {
    //   lastResult = `0` + lastResult;
    // }

    // console.log(resTextContent.split(/[,.]/).join(``));
    if (resValue.length >= resMaxLen) {
      if (operator === null) {
        return;
      } else if (operator !== null && lastNum != ``) {
        return;
      }
    }
    console.log(`${resValue.length} >= ${resMaxLen}`);

    if (operator === null) {
      if (num === `.` && resTextContent === "0") {
        firstNum = `0` + num;
        console.log(firstNum);
      } else {
        firstNum += num;
      }
      renderResult(firstNum);
    } else {
      lastNum += num;
      renderResult(lastNum);
    }

    // if (operator === null) {
    //   renderResult(lastResult);
    // } else {
    //   renderResult(lastNum);
    // }
  });
});

ops.forEach((o) => {
  o.addEventListener(`click`, function () {
    let opsId = o.id;

    if (opsId === `percentage` || opsId === `toggle-sign`) {
      let res;

      if (operator === null && firstNum !== ``) {
        res = calculate(firstNum, opsId);
        firstNum = res;
      } else if (operator !== null && lastNum !== ``) {
        res = calculate(lastNum, opsId);
        lastNum = res;
      } else if (lastResult) {
        res = calculate(lastResult, opsId);
        lastResult = res;
      }

      renderResult(res);

      return;
    }

    if (operator !== null && lastNum !== ``) {
      if (firstNum !== ``) {
        lastResult = calculate(firstNum, operator, lastNum);
      } else {
        lastResult = calculate(lastResult, operator, lastNum);
      }
      firstNum = ``;
      lastNum = ``;
      renderResult(lastResult);
    }

    operator = opsId;
  });
});

equals.addEventListener(`click`, function () {
  if (operator === null) return;

  if (firstNum !== ``) {
    lastResult = calculate(firstNum, operator, lastNum);
  } else {
    lastResult = calculate(lastResult, operator, lastNum);
  }
  firstNum = ``;
  lastNum = ``;
  operator = null;

  renderResult(lastResult);
});

function handleAC() {
  lastResult = 0;
  firstNum = ``;
  lastNum = ``;
  operator = null;
  renderResult(`0`);
  AC.innerText = `AC`;
}

function renderResult(result) {
  let resultValueLen = result.toString().split(`.`).join(``).length;
  if (resultValueLen > resMaxLen) {
    result = (+result).toExponential(2);
  } else {
    result = formatNumberWithCommas(result);
  }
  resultEl.innerText = result;
  fitResultToContainer();
}

function formatNumberWithCommas(number) {
  if (number === undefined) return `0`;
  if (number === `.` || number === `0.`) return number;
  let numberStr = number + ``;
  let parts = numberStr.split(`.`);
  let integerPart = parts[0];
  let decimalPart = parts[1] ? `.` + parts[1] : ``;

  let result = ``;
  let count = 0;
  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result;
    count++;

    if (count % 3 === 0 && i != 0) {
      result = `,` + result;
    }
  }
  return result + decimalPart;
}

function fitResultToContainer() {
  let parentWidth = resultEl.parentElement.offsetWidth;
  let elementWidth = resultEl.offsetWidth;
  let ratio = parentWidth / elementWidth;
  if (ratio < 1) {
    resultEl.style.transform = `scale(${ratio})`;
  } else {
    resultEl.style.transform = `scale(1)`;
  }
}

// handle keyboard click

let opsObj = {
  "+": "addition",
  "-": "subtraction",
  "*": "multiplication",
  "/": "division",
  "%": "percentage",
  "=": "equals",
  Enter: "equals",
  Escape: "ac",
  c: "ac",
};

function handleCalcKeydown(e) {
  let key = e.key;
  let el =
    document.querySelector(`#${opsObj[key]}`) ??
    document.querySelector(`[data-num="${key}"]`);

  if (
    e.altKey &&
    (key.charCodeAt(0) === 8211 || key.charCodeAt(0) === 45 || key === "-")
  ) {
    //when holding the option key on mac and press on minus key, it results in "–" which has the code of 8211 on ASCII
    el = document.getElementById(`toggle-sign`);
    e.preventDefault();
  }

  el?.focus();
  el?.click();
}
