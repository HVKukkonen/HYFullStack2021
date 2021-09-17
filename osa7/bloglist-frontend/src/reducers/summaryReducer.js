import userService from '../services/users';

// ACTION CREATORS ---------------------------------------------------------
export const initUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch(
    {
      type: 'SUMMARY-INIT',
      data: { users },
    },
  );
};

const summaryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SUMMARY-INIT':
      return action.data.users;
    default:
      return state;
  }
};

export default summaryReducer;
