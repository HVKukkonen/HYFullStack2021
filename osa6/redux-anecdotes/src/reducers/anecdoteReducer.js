const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// HELPERS  ---------------------------------------------------------
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

export const create = (anecdote) => {
  return ({
    type: 'ANECDOTE-CREATE',
    data: {
      anecdote
    }
  })
}

// REDUCER  ---------------------------------------------------------
const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
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
      const newElement = asObject(action.data.anecdote)
      return state.concat(newElement)

    default: return state
  }
}

export default anecdoteReducer