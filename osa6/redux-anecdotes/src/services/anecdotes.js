import axios from 'axios'
import { completeAnecdote } from '../helpers'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, completeAnecdote(anecdote))
  return response.data
}

const update = async (newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return response.data
}

// make a neat package
const anecdoteService = {
  getAll, create, update
}

export default anecdoteService