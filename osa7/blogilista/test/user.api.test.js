const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const testUsers = [
  {
    username: 'tester1',
    password: '/hfff',
    name: 'tt',
  },
  {
    username: 'tester2',
    password: '12324',
    name: 'tp',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let tempUser = new User(testUsers[0]);
  await tempUser.save();
  tempUser = new User(testUsers[1]);
  await tempUser.save();
});

// superagent instance enabling testing the api
const api = supertest(app);

test('get works', async () => {
  const response = await api.get('/api/users');
  expect(response.body).toHaveLength(2);
});

test('POST: correct amount after POST', async () => {
  // check len
  const beforeLen = testUsers.length;

  // create new user
  const newUser = {
    username: 'tester3',
    password: '12324',
    name: 'pp',
  };
  await api
    .post('/api/users')
    .send(newUser);

  // check len
  const testRes = await api.get('/api/users');
  console.log('test res', testRes.body);
  expect(testRes.body).toHaveLength(beforeLen + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
