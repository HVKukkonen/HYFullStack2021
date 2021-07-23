// TITLE: Create session token from user login
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const loginRouter = require('express').Router();
require('dotenv').config();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  console.log('Log in start');
  const user = await User.findOne({ username: request.body.username });
  console.log('request username', request.body.username);
  console.log('request password', request.body.password);
  console.log('db user', user);
  console.log('secret', process.env.SECRET);
  const passwordCorrect = (user === null)
    ? false
    : await bcryptjs.compare(request.body.password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
