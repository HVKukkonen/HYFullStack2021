import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { set, remove } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdote)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const voteAndNotify = (anecdote) => {
    // to anecdote reducer
    dispatch(vote(anecdote.id))
    // clear old timer in case re-vote occurs before timer runs out
    clearTimeout(notification.timeoutID)
    // to notification reducer
    // save the timeoutID to reset timer if re-vote occurs before timer runs out
    const timeoutID = setTimeout(
      // remove notification after a delay
      () => dispatch(remove()),
      5000
    )
    dispatch(set(`You voted ${anecdote.content}`, timeoutID))
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAndNotify(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
