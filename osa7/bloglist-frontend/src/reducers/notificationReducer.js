// ACTION CREATORS ---------------------------------------------
export const removeNotification = () => (
  {
    type: 'NOTIFICATION-REMOVE',
  }
);

export const setNotification = (notification, timeoutID) => (
  {
    type: 'NOTIFICATION-CREATE',
    data: {
      notification,
      timeoutID,
    },
  }
);

// HELPERS -----------------------------------------------------
// produces a state object of correct form
const stater = (notification, timeoutID = '') => (
  {
    notification,
    timeoutID,
  }
);

// REDUCER ---------------------------------------------------
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION-REMOVE':
      return '';
    case 'NOTIFICATION-CREATE':
      return stater(action.data.notification, action.data.timeoutID);
    default:
      return state;
  }
};

export default notificationReducer;
