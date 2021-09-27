import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  <input
    id='blogform-title'
    value={blogName}
    onChange={blogNameHandler}
  />
  <br />
  author:
  <input
    id='blogform-author'
    value={author}
    onChange={authorHandler}
  />
  <br />
  url:
  <input
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

BlogForm.propTypes = {
  blogName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default BlogForm;
