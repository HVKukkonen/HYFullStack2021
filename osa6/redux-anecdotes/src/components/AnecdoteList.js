import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdote)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const voteAndNotify = (anecdote) => {
    // to anecdote reducer
    dispatch(vote(anecdote))

    // clear old timer in case re-vote occurs before timer runs out
    clearTimeout(notification.timeoutID)
    // to notification reducer
    dispatch(setNotification(`You voted ${anecdote.content}`, 3))
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
