import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

// token variable set at run time through setToken
let token
const setToken = (newToken) => {
  token = `bearer ${newToken}`
};

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// post to backend and return
const create = async (blog) => {
  const config = {
    headers: { authorization: token },
  }

  return await axios.post(baseUrl, blog, config)
}

// update
const update = async (blog) => await axios.put(`${baseUrl}/${blog.id}`, blog)

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, setToken, update, remove }
