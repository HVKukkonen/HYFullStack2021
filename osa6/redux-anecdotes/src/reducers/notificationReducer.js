const notificationAtStart = 'Es hier ist ein Notification'

// ACTION CREATORS ---------------------------------------------
export const remove = () => {
  return ({
    type: 'NOTIFICATION-REMOVE'
  })
}

export const set = (notification, timeoutID) => {
  return ({
    type: 'NOTIFICATION-CREATE',
    data: {
      notification,
      timeoutID
    }
  })
}

// HELPERS -----------------------------------------------------
// produces a state object of correct form 
const stater = (notification, timeoutID = '') => {
  return ({
    notification,
    timeoutID
  })
}

// REDUCER -----------------------------------------------------
const initialState = stater(notificationAtStart)

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION-REMOVE':
      return []
    case 'NOTIFICATION-CREATE':
      const newState = stater(action.data.notification, action.data.timeoutID)
      return newState
    default:
      return state
  }
}

export default notificationReducer