import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { createBlog } from '../reducers/blogReducer';

const formatAsBlog = (title, author, url, likes, user) => (
  {
    title,
    author,
    url,
    likes,
    user,
  }
);

const blogSubmit = (event, dispatch, blog, setShowForm) => {
  event.preventDefault();
  dispatch(
    createBlog(blog),
  );
  setShowForm(false);
};

const BlogForm = (props) => {
  const [blogName, setBlogName] = useState('');
  const blogNameHandler = (charEvent) => setBlogName(charEvent.target.value);
  const [author, setAuthor] = useState('');
  const authorHandler = (charEvent) => setAuthor(charEvent.target.value);
  const [url, setUrl] = useState('');
  const urlHandler = (charEvent) => setUrl(charEvent.target.value);

  const blog = formatAsBlog(blogName, author, url, 0, props.user);

  const dispatch = useDispatch();

  return <form
    onSubmit={(e) => blogSubmit(e, dispatch, blog, props.setShowForm)}>
    title:
    <TextField
      id='blogform-title'
      value={blogName}
      onChange={blogNameHandler}
    />
    <br />
    author:
    <TextField
      id='blogform-author'
      value={author}
      onChange={authorHandler}
    />
    <br />
    url:
    <TextField
      id='blogform-url'
      value={url}
      onChange={urlHandler}
    />
    <br />
    <button id='blogform-create' type='submit'>
      create
    </button>
  </form>;
};

const HideableBlogForm = (props) => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div key='blogformcontainer'>
        <h2>create new</h2>
        <BlogForm
          key='blogform'
          user={props.user}
          setShowForm={setShowForm}
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

BlogForm.propTypes = {
  blogName: PropTypes.string,
  author: PropTypes.string,
  user: PropTypes.object,
  setShowForm: PropTypes.func,
};

HideableBlogForm.propTypes = {
  user: PropTypes.object,
};

export default HideableBlogForm;
