import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import { createBlog, initBlogs, sortBlogs, likeBlog, deleteBlog } from './reducers/blogReducer';
import { notify } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const LoginPage = (props) => <form onSubmit={props.loginFormAction}>
  <h1>log in to application</h1>
  <br />
  username:
  <input
    value={props.usernameHolder}
    onChange={props.usernameHandler}
  />
  <br />
  password:
  <input
    value={props.passwordHolder}
    onChange={props.passwordHandler}
  />
  <br />
  <button type='submit'>
    login
  </button>
</form>

// blogs page
const LogoutButton = (setUser) => {
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return <button
    onClick={() => logout()}>log out
  </button>;
};

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
  // localStorage.clear()

  // useSelector hook functions as a subscriber
  // const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  // login
  const [usernameHolder, setUsername] = useState('');
  const usernameHandler = (charEvent) => setUsername(charEvent.target.value);
  const [passwordHolder, setPassword] = useState('');
  const passwordHandler = (charEvent) => setPassword(charEvent.target.value);

  // logged user
  const [user, setUser] = useState();

  const loginSubmit = async (event) => {
    event.preventDefault();

    const loggedUser = await loginService.login({
      username: usernameHolder,
      password: passwordHolder,
    });

    // set user with token as user
    setUser(loggedUser);
    window.localStorage.setItem('user', JSON.stringify(loggedUser));

    // set token for session
    blogService.setToken(loggedUser.token);
  };

  const LoginPagePage = () => <LoginPage
    loginFormAction={loginSubmit}
    usernameHolder={usernameHolder}
    usernameHandler={usernameHandler}
    passwordHolder={passwordHolder}
    passwordHandler={passwordHandler}
  />;

  // fetch user from valid session
  useEffect(() => {
    const sessionUser = JSON.parse(window.localStorage.getItem('user'));
    if (sessionUser) {
      setUser(sessionUser);
      blogService.setToken(sessionUser.token);
    }
  }, []);

  // BLOGS ---------------------------------------------
  useEffect(async () => {
    dispatch(await initBlogs());
  }, [user]);

  // BLOG FORM --------------------------------------------
  const [blogName, setBlogName] = useState('');
  const blogNameHandler = (charEvent) => setBlogName(charEvent.target.value);
  const [author, setAuthor] = useState('');
  const authorHandler = (charEvent) => setAuthor(charEvent.target.value);
  const [url, setUrl] = useState('');
  const urlHandler = (charEvent) => setUrl(charEvent.target.value);
  const [showForm, setShowForm] = useState(false);

  const blogSubmit = () => {
    dispatch(createBlog(formatAsBlog(blogName, author, url, 0, user)));
    setShowForm(false);
  };

  const DisplayBlogForm = () => {
    if (showForm) {
      return (
        <div>
          <BlogForm
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

  const BlogPage = () => <div>
    <h2>blogs</h2>
    {useSelector((state) => state.notification.notification)}
    {`${user.name} logged in`}
    {LogoutButton(setUser)}
    <h2>create new</h2>
    {DisplayBlogForm()}
  </div>;

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : LoginPagePage()}
        </Route>
        <Route path='/'>
          {user ? <BlogPage /> : <Redirect to='/login' />}
          <Blogs user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
