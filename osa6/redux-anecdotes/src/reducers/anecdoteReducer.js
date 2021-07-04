import anecdoteService from "../services/anecdotes"

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
export const initializeAnecdotes = () => {
  return (
    // async arrow (or lambda) function that handles backend and dispatch
    async (dispatchFunction) => {
      const anecdotes = await anecdoteService.getAll()
      // why does this resolve to the actual dispatch? Where is it given?
      dispatchFunction({
        type: 'ANECDOTE-FETCH',
        data: anecdotes
      })
    }
  )
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