const userRouter = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

userRouter.get('/', async (request, response, next) => {
  try {
    response.json(await User.find({}).populate('blog'));
  } catch (exception) {
    next(exception);
  }
});

userRouter.post('/', async (request, response, next) => {
  try {
    const newUser = request.body;
    // replace user input password with password hash
    newUser.password = await bcryptjs.hash(newUser.password, 10);
    // save request data as new user &
    // catch new user instance returned by the db
    const savedUser = new User(newUser).save();
    response.json(savedUser).status(201);
  } catch (exception) {
    next(exception);
  }
});

userRouter.delete('/', async (request, response, next) => {
  try {
    await User.deleteMany({});
    response.status(200).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
