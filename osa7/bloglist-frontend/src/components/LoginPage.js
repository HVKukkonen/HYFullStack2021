import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const loginSubmit = (event, dispatch, usernameHolder, passwordHolder) => {
  event.preventDefault();
  // set user with token as user
  dispatch(loginUser(usernameHolder, passwordHolder));
};

const LoginPage = () => {
  const [usernameHolder, setUsername] = useState('');
  const usernameHandler = (charEvent) => setUsername(charEvent.target.value);
  const [passwordHolder, setPassword] = useState('');
  const passwordHandler = (charEvent) => setPassword(charEvent.target.value);

  const dispatch = useDispatch();

  return <form onSubmit={(e) => loginSubmit(e, dispatch, usernameHolder, passwordHolder)}>
    <h1>log in to application</h1>
    <br />
    username:
    <input
      value={usernameHolder}
      onChange={usernameHandler}
    />
    <br />
    password:
    <input
      value={passwordHolder}
      onChange={passwordHandler}
    />
    <br />
    <button type='submit'>
      login
    </button>
  </form>;
};

export default LoginPage;
