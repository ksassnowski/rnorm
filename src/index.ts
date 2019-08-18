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
 * Generates random numbers based on a normal distribution.
 *
 * @param n The number of datasets to be simulated, i.e. how many numbers you want to generate.
 * @param mean The mean of the normal distribution
 * @param sd The standard deviation of the normal distribution.
 */
export default function(n: number, mean: number, sd: number): number[] {
  return generateRandomNumbers(n).map(x => x * sd + mean);
}
