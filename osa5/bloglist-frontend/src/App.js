import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

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
    window.localStorage.clear()
    setUser(null);
  };

  return <button
    onClick={() => logout()}>log out
  </button>;
};

const formatAsBlog = (title, author, url, likes, user) => {
  return {
    title,
    author,
    url,
    likes,
    user,
  }
};

// return blogs sorted by likes in descending order
const sortBlogs = (blogs) => blogs.sort(
  (a, b) => b.likes - a.likes
)

// const Blogs = (blogs, likeBlog) => <div>
//   {blogs.map(blog =>
//     <div>
//       <Blog key={blog.id} blog={blog} />
//       <Toggleable buttonLabel='view'>
//         <FullBlog key={blog.id} blog={blog} />
//         <button onClick={() => likeBlog(blog)}>like</button>
//       </Toggleable>
//     </div>
//   )}
// </div>;

const App = () => {
  // localStorage.clear()

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
    blogService.setToken(loggedUser.token)
  }

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
      setUser(sessionUser)
      blogService.setToken(sessionUser.token);
    }
  }, [])

  // BLOGS ---------------------------------------------
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [user])

  // BLOG FORM --------------------------------------------
  const [blogName, setBlogName] = useState('');
  const blogNameHandler = (charEvent) => setBlogName(charEvent.target.value);
  const [author, setAuthor] = useState('');
  const authorHandler = (charEvent) => setAuthor(charEvent.target.value);
  const [url, setUrl] = useState('');
  const urlHandler = (charEvent) => setUrl(charEvent.target.value);
  const [showForm, setShowForm] = useState(false);

  // blog form submission handler
  const blogSubmit = async () => {
    // backend
    const newBlog = await blogService.create(formatAsBlog(blogName, author, url));
    // frontend
    setShowForm(false);
    setBlogs(blogs.concat(newBlog));
  };

  const likeBlog = (blog, setBlogs, blogs) => {
    const newBlog = blog;
    newBlog.likes = newBlog.likes + 1
    // remove old blog data
    const updatedBlogs = blogs.filter((elem) => elem.id !== blog.id)
    setBlogs(sortBlogs(updatedBlogs.concat(newBlog)))
    // update new to back
    blogService.update(newBlog)
  }

  const removeBlog = (id, setBlogs, blogs) => {
    // remove blog frontend
    setBlogs(blogs.filter((elem) => elem.id !== id))
    // remove backend
    blogService.remove(id)
  };

  const removeButton = (id) => <button
    onClick={() => removeBlog(id, setBlogs, blogs)}>
    remove
    </button>;

  const Blogs = (blogs) => <div>
    {blogs.map(blog => <div key={blog.id}>
      <Blog blog={blog} like_handler={() => likeBlog(blog, setBlogs, blogs)} />
      {user.username === blog.user.username ? removeButton(blog.id) : null}
    </div>
    )}
  </div>;

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
      )
    }

    return <button onClick={() => setShowForm(true)}>new note</button>;
  };

  const BlogPage = () => <div>
    <h2>blogs</h2>
    {`${user.name} logged in`}
    {LogoutButton(setUser)}
    <h2>create new</h2>
    {DisplayBlogForm()}
    {Blogs(blogs, likeBlog)}
  </div>;

  return (
    <div>
      {user ? BlogPage() : LoginPagePage()}
    </div>
  )
};

export default App