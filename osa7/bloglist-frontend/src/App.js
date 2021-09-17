import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import { createBlog, initBlogs, sortBlogs, likeBlog, deleteBlog } from './reducers/blogReducer';
import { continueSession, loginUser } from './reducers/userReducer';
import { notify } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import Header from './components/Header';
import AllUsersPage from './components/AllUsersPage';
import { initUsers } from './reducers/summaryReducer';

const formatAsBlog = (title, author, url, likes, user) => (
  {
    title,
    author,
    url,
    likes,
    user,
  }
);

const Notification = (notification) => <div>
  {notification}
</div>;

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const notification = useSelector((state) => state.notification.notification);
  // const history = useHistory();

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

  // BLOG FORM --------------------------------------------
  const [blogName, setBlogName] = useState('');
  const blogNameHandler = (charEvent) => setBlogName(charEvent.target.value);
  const [author, setAuthor] = useState('');
  const authorHandler = (charEvent) => setAuthor(charEvent.target.value);
  const [url, setUrl] = useState('');
  const urlHandler = (charEvent) => setUrl(charEvent.target.value);
  const [showForm, setShowForm] = useState(false);

  const blogSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createBlog(formatAsBlog(blogName, author, url, 0, user)),
    );
    setShowForm(false);
  };

  const DisplayBlogForm = () => {
    if (showForm) {
      return (
        <div key='blogformcontainer'>
          <h2>create new</h2>
          <BlogForm
            key='blogform'
            blogSubmit={blogSubmit}
            blogName={blogName}
            blogNameHandler={blogNameHandler}
            author={author}
            authorHandler={authorHandler}
            url={url}
            urlHandler={urlHandler}
          />
          <button onClick={() => setShowForm(false)}>cancel</button>
        </div>
      );
    }
    // else
    return (
      <div>
        <h2>create new</h2>
        <button onClick={() => setShowForm(true)}>new note</button>
      </div>
    );
  };

  const testUser = {
    username: 'tester',
    blogs: ['blog1', 'blog2'],
    id: 'djflgkehs',
  };

  const testUser2 = {
    username: 'tester2',
    blogs: ['blogA', 'blogB'],
    id: 'sgfhghh',
  };

  const testUsersList = [testUser, testUser2];

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

  // find user matching id for displaying user page
  const match = useRouteMatch('/users/:id');
  const matchingUser = (match)
    ? allUsers.find((userElem) => userElem.id === match.params.id)
    : null;

  return (
    <>
      <Header
        notification={notification}
        username={user.username}
        dispatch={dispatch}
      />
      <Switch>
        <Route path='/users/:id'>
          <UserPage user={matchingUser} />
        </Route>
        <Route path='/users'>
          <AllUsersPage users={allUsers} />
        </Route>
        <Route path='/'>
          <DisplayBlogForm />
          <Blogs user={user} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
