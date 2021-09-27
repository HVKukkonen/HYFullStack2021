module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  plugins: [
    'react', 'jest', 'cypress',
  ],
  rules: {
    // linebreaks not checked as I seem to be mixing crlf and lf
    'linebreak-style': 0,
    'no-param-reassign': 0,
  },
  parser: 'babel-eslint',
};
