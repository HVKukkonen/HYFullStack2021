// TITLE: controller for blogs routing
const jwt = require('jsonwebtoken');
// create router object
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// helper function to get access token
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog(request.body);
  blog.user = user;

  // insert 0 for non-existing likes
  if (!blog.likes) { blog.likes = 0; }

  // await ... returns promise value not promise
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

// delete one
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/', async (request, response, next) => {
  try {
    await Blog.deleteMany({});
    response.status(200).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user.id,
  };

  try {
    const updated = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true, omitUndefined: true })
      // populate the user id linked to blog with the corresponding user object from users
      .populate('user');
    response.json(updated).status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { id } = request.params;
  const updated = await Blog.findById(id);

  // alter between updating an existing list and creating the first comment
  if (updated.comments) {
    updated.comments = updated.comments.concat(request.body.comment);
  } else {
    updated.comments = [request.body.comment];
  }

  try {
    await Blog.findByIdAndUpdate(id, updated);
    response.json(updated).status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// delete all comments of a blog
blogsRouter.delete('/:id/comments', async (request, response, next) => {
  try {
    await Blog
      .findByIdAndUpdate(request.params.id, { comments: [] }, { new: true, omitUndefined: true });
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// export the defined router
module.exports = blogsRouter;
