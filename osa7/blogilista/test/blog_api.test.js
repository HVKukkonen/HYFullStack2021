const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'String1',
    author: 'Author1',
    url: 'url1',
    likes: 1,
  },
  {
    title: 'String2',
    author: 'Author2',
    url: 'url2',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  // const promiseArray = initialBlogs.forEach((blog) => api.post('/api/blogs', blog));
  // await Promise.all(promiseArray);
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

const api = supertest(app);

test('correct amount of json blogs', async () => {
  const testRes = await api.get('/api/blogs');

  expect(testRes.body).toHaveLength(2);
});

test('POST: correct amount after POST', async () => {
  // check len
  const beforeLen = initialBlogs.length;

  // post new blog
  const newBlog = {
    title: 'String3',
    author: 'Author3',
    url: 'url3',
    likes: 3,
  };
  await api
    .post('/api/blogs')
    .send(newBlog);

  // check len
  const testRes = await api.get('/api/blogs');
  expect(testRes.body).toHaveLength(beforeLen + 1);
});

test('id in correct format', async () => {
  const blogs = await api.get('/api/blogs');
  // blogs.body.forEach((blog) => console.log('here'));
  blogs.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test('likes >= 0', async () => {
  const blogs = await api.get('/api/blogs');
  blogs.body.forEach((blog) => expect(blog.likes).toBeGreaterThanOrEqual(0));
});

test('respond 400 if url || title missing', async () => {
  // new blog
  const newBlog = {
    // title: 'String3',
    author: 'Author3',
    // url: 'url3',
    likes: 3,
  };

  const response = await api.post('/api/blogs').send(newBlog);

  expect(response.status).toBe(400);
});

afterAll(() => {
  mongoose.connection.close();
});
