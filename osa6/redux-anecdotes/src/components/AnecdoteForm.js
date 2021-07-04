import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // event handler
  const submitAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.newAnecdote.value
    // clear form
    event.target.newAnecdote.value = ''
    const dbAnecdote = await anecdoteService.create(anecdote)
    dispatch(createAnecdote(dbAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
