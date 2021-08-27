import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import { createBlog, initBlogs, sortBlogs, likeBlog, deleteBlog } from './reducers/blogReducer';
import { continueSession, loginUser, logout } from './reducers/userReducer';
import { notify } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginPage from './components/LoginPage';

const LogoutButton = (props) => <button onClick={() => props.dispatch(logout())}>log out</button>;

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
      continueSession(sessionUser);
    }
  }, []);

  // BLOGS ---------------------------------------------
  useEffect(async () => {
    dispatch(await initBlogs());
  }, [useSelector((state) => state.user)]);

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
    return <button onClick={() => setShowForm(true)}>new note</button>;
  };

  const BlogPage = () => <div key='blogpage'>
    <h2>blogs</h2>
    {useSelector((state) => state.notification.notification)}
    {`${useSelector((state) => state.user.username)} logged in`}
    <LogoutButton dispatch={dispatch}/>
    <h2>create new</h2>
    <DisplayBlogForm />
  </div>;

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          {useSelector((state) => state.user).username ? <Redirect to='/' /> : <LoginPage
            loginFormAction={loginSubmit}
            usernameHolder={usernameHolder}
            usernameHandler={usernameHandler}
            passwordHolder={passwordHolder}
            passwordHandler={passwordHandler}
          />}
        </Route>
        <Route path='/'>
          {useSelector((state) => state.user).username ? <BlogPage /> : <Redirect to='/login' />}
          <Blogs user={ useSelector((state) => state.user) } />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
