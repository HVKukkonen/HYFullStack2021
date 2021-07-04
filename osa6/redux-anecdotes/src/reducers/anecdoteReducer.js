import anecdoteService from "../services/anecdotes"

// ACTION CREATORS, I.E., FORMATTERS FOR DISPATCHING TO THE REDUCER ---------------------------
export const vote = (anecdote) => {
  // dispatch a js object of correct form
  return (
    async (dispatchFunction) => {
      // new element that has same fields gets its vote overwriten
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      const completeAnecdote = await anecdoteService.update(updatedAnecdote)
      console.log('complete anecdote at vote: ', completeAnecdote)
      dispatchFunction({
        type: 'ANECDOTE-INCREMENT',
        completeAnecdote
      })
    }
  )
}

export const createAnecdote = (anecdote) => {
  return (
    async (dispatchFunction) => {
      const completeAnecdote = await anecdoteService.create(anecdote)
      dispatchFunction({
        type: 'ANECDOTE-CREATE',
        completeAnecdote
      })
    }
  )
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
      const changedElem = action.completeAnecdote
      return state
        // change the voted element in frontend
        .map(elem => elem.id === changedElem.id ? changedElem : elem)
        .sort((a, b) => b.votes - a.votes)

    case 'ANECDOTE-CREATE':
      return state.concat(action.completeAnecdote)

    case 'ANECDOTE-FETCH':
      return action.data

    default: return state
  }
}

export default anecdoteReducer