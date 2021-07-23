module.exports = {
  env: {
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    // windows linebreaks when not in production environment
    'linebreak-style': ['error', 'windows'],
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
  },
};
