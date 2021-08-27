import loginService from '../services/login';
import blogService from '../services/blogs';

// ACTION CREATORS -------------------------------------------------------
export const loginUser = (username, password) => async (dispatch) => {
  // redux-thunk middleware handles async API call operations
  // ultimately dispatching only a pure object
  const loggedUser = await loginService.login({
    username,
    password,
  });

  // save session
  window.localStorage.setItem('user', JSON.stringify(loggedUser));
  // set token for session
  blogService.setToken(loggedUser.token);

  // async dispatch
  dispatch({
    type: 'USER-LOGIN',
    data: { user: loggedUser },
  });
};

export const continueSession = (user) => {
  // set token for session
  blogService.setToken(user.token);
  return ({ type: 'USER-LOGIN', data: { user } });
};

export const logout = () => {
  window.localStorage.clear();
  return ({ type: 'USER-LOGOUT' });
};

// REDUCER
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER-LOGIN':
      return action.data.user;
    case 'USER-LOGOUT':
      return {};
    default:
      return state;
  }
};

export default userReducer;
