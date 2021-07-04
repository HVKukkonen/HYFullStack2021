const notificationAtStart = 'Es hier ist ein Notification'

// ACTION CREATORS ---------------------------------------------
export const removeNotification = () => {
  return ({
    type: 'NOTIFICATION-REMOVE'
  })
}

export const setNotification = (notification, delay) => {
  return (
    (dispatchFunction) => {
      // save the timeoutID to reset timer if re-vote occurs before timer runs out
      const timeoutID = setTimeout(
        // remove notification after a delay
        () => dispatchFunction(removeNotification()),
        delay * 1000
      )
      dispatchFunction({
        type: 'NOTIFICATION-CREATE',
        data: {
          notification,
          timeoutID
        }
      })
    }
  )
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