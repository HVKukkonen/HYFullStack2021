import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // event handler
  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.newAnecdote.value
    // clear form
    event.target.newAnecdote.value = ''
    dispatch(create(anecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
