module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    browser: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true }],
  },
};
