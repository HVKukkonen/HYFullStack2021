import { completeAnecdote } from "../helpers"

// ACTION CREATORS, I.E., FORMATTERS FOR DISPATCHING TO THE REDUCER ---------------------------
export const vote = (id) => {
  console.log('vote', id)
  // dispatch a js object of correct form
  return ({
    type: 'ANECDOTE-INCREMENT',
    data: {
      id
    }
  })
}

export const createAnecdote = (completeAnecdote) => {
  return ({
    type: 'ANECDOTE-CREATE',
    completeAnecdote
  })
}

// redux state follows the data structure of the database, no transformations applied
export const initializeAnecdotes = (allAnecdotes) => {
  return ({
    type: 'ANECDOTE-FETCH',
    data: allAnecdotes
  })
}

// REDUCER  ---------------------------------------------------------
const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ANECDOTE-INCREMENT':
      const id = action.data.id
      const elemToChange = state.find(elem => elem.id === id)
      const changedElem = {
        ...elemToChange,  // spread the iterable element
        votes: elemToChange.votes + 1  // replace matching key with new value
      }
      return state
        // change the changed element
        .map(elem =>
          elem.id === id ? changedElem : elem)
        .sort((a, b) => b.votes - a.votes)

    case 'ANECDOTE-CREATE':
      return state.concat(action.completeAnecdote)

    case 'ANECDOTE-FETCH':
      return action.data

    default: return state
  }
}

export default anecdoteReducer