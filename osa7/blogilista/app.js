// TITLE: main app logic, utilises middlewares

// const http = require('http')
const express = require('express');
// intialise Express application
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
// intialise the router specified
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');
const errorHandler = require('./utils/error_handlers');

// const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());

// use blogsRouter object for handling queries to the path specified
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(errorHandler);

module.exports = app;
