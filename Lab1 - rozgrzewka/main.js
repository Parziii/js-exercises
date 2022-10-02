const inputs = document.querySelectorAll(".number-input");
const resultBtn = document.querySelector(".result-btn");
const sumResult = document.querySelector(".result-sum");
const minResult = document.querySelector(".result-min");
const maxResult = document.querySelector(".result-max");
const avgResult = document.querySelector(".result-avg");

resultBtn.onclick = () => {
  const inputValues = Array.from(inputs).map((input) => Number(input.value));

  const sum = inputValues.reduce((acc, a) => acc + a, 0);
  const min = Math.min(...inputValues);
  const max = Math.max(...inputValues);
  const avg = inputValues.reduce((a, b) => a + b, 0) / inputValues.length;

  sumResult.innerHTML = sum;
  minResult.innerHTML = min;
  maxResult.innerHTML = max;
  avgResult.innerHTML = avg;
};
