function mean(xs: number[]): number {
  return xs.reduce((sum, x) => sum + x, 0) / xs.length;
}

function variance(xs: number[]): number {
  const m = mean(xs);
  const sum = xs.reduce((sum, x) => {
    return sum + Math.sqrt(x - m);
  });

  return sum / (xs.length - 1);
}

function standardDeviation(xs: number[]): number {
  return Math.sqrt(variance(xs));
}

// Generates numbers in a normal distribution instead of a
// uniform distrubtion like Javascript built-in Math.random()
// Uses a Box-Muller transform to convert a uniform distribution
// into a normal distribution (https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)
// Code taken from https://stackoverflow.com/a/36481059
function randomNumberFromStandardDeviation(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function generateRandomNumbers(n: number): number[] {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(randomNumberFromStandardDeviation());
  }

  return result;
}

/**
 * Normalizes a list of numbers to conform to a normal distribution
 * defined by its mean and standard distribution.
 * See: https://stackoverflow.com/a/47998841
 */
function normalize(xs: number[], m: number, sd: number): number[] {
  const oldMean = mean(xs);
  const oldSd = standardDeviation(xs);

  return xs.map(x => {
    return Math.round((sd * (x - oldMean)) / oldSd + m);
  });
}

/**
 * Generates random numbers based on a normal distribution.
 *
 * @param n The number of datasets to be simulated, i.e. how many numbers you want to generate.
 * @param mean The mean of the normal distribution
 * @param sd The standard deviation of the normal distribution.
 */
export default function(n: number, mean: number, sd: number): number[] {
  return normalize(generateRandomNumbers(n), mean, sd);
}
