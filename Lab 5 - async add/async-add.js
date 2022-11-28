const data = new Array(100).fill(1);

const sumValues = (...numbers) =>
  [...numbers].reduce(
    async (currentSum, current) => asyncAdd(await currentSum, current),
    0
  );

measurePerformance("add 1", () => sumValues(...data), data);

async function measurePerformance(name, cb) {
  console.log(`Start: ${name}`);
  performance.mark("mf-start");
  const result = await cb();
  performance.mark("mf-end");
  const runTime = performance.measure(
    "Czas wykonania kodu",
    "mf-start",
    "mf-end"
  );
  console.log(`Wynik z ${name}: ${result}`);
  console.log(`Czas wykonywania: ${runTime.duration.toFixed(2)}ms`);
}
async function asyncAdd(a, b) {
  console.count("[async add operation]");
  if (typeof a !== "number" || typeof b !== "number") {
    console.log("err", { a, b });
    return Promise.reject("Argumenty muszą mieć typ number!");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 10);
  });
}
