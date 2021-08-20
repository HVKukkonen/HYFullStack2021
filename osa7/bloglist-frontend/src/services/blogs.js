import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

// token variable set at run time through setToken
let token;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// post to backend and return
const create = async (blog) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

// update
const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll, create, setToken, update, remove,
};
