import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  // event handler
  const submitAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.newAnecdote.value
    // clear form
    event.target.newAnecdote.value = ''
    props.createAnecdote(anecdote)
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

const mapDispatchToProps = {
  createAnecdote
}

// link dispatch to action creator and map this to AnecdoteForm props
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
