/**
 * Array with nonograms.
 * @typedef {Object} Nonogram
 * @property {number[][]} matrix - Nonogram matrix, where 1 is a filled cell, 0 is an empty cell.
 * @property {string} title - The title of the nonogram.
 */
const nonograms = [
  {
    matrix: [
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    ],
    title: 'snowman',
  },
  {
    matrix: [
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    ],
    title: 'snowman2',
  },
];

export default nonograms;
