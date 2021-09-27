import React, { useState, useEffect } from 'react';
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
} from '@material-ui/core';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import HideableBlogForm from './components/BlogForm';
import { initBlogs } from './reducers/blogReducer';
import { continueSession, loginUser } from './reducers/userReducer';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import Header from './components/Header';
import AllUsersPage from './components/AllUsersPage';
import { initUsers } from './reducers/summaryReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const blogs = useSelector((state) => state.blogs);

  // login
  const [usernameHolder, setUsername] = useState('');
  const usernameHandler = (charEvent) => setUsername(charEvent.target.value);
  const [passwordHolder, setPassword] = useState('');
  const passwordHandler = (charEvent) => setPassword(charEvent.target.value);

  const loginSubmit = async (event) => {
    event.preventDefault();
    // set user with token as user
    dispatch(loginUser(usernameHolder, passwordHolder));
  };

  // fetch user from valid session
  useEffect(() => {
    const sessionUser = JSON.parse(window.localStorage.getItem('user'));
    if (sessionUser) {
      dispatch(continueSession(sessionUser));
    }
  }, []);

  // fetch list of blogs for the user and a list of all users
  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
  }, [user]);

  // find user matching id for displaying user page
  const match = useRouteMatch('/users/:id');
  const matchingUser = (match)
    ? allUsers.find((userElem) => userElem.id === match.params.id)
    : null;
  const matchingBlogs = (match)
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null;

  const matchBlog = useRouteMatch('/blogs/:id');
  const matchingSingleBlog = (matchBlog)
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  if (!user.username) {
    return (
      <LoginPage
        loginFormAction={loginSubmit}
        usernameHolder={usernameHolder}
        usernameHandler={usernameHandler}
        passwordHolder={passwordHolder}
        passwordHandler={passwordHandler}
      />
    );
  }

  return (
    <Container>
      <Header username={user.username} />
      <Switch>
        <Route path='/users/:id'>
          <UserPage user={matchingUser} blogs={matchingBlogs}/>
        </Route>
        <Route path='/users'>
          <AllUsersPage users={allUsers} blogs={blogs} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={matchingSingleBlog} />
        </Route>
        <Route path='/'>
          <HideableBlogForm />
          <Blogs user={user} blogs={blogs}/>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
