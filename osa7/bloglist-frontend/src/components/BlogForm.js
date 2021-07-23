import React from 'react'
import PropTypes from 'prop-types';

const BlogForm = (props) => <form
  onSubmit={props.blogSubmit}>
  title:
  <input
    id='blogform-title'
    value={props.blogName}
    onChange={props.blogNameHandler}
  />
  <br />
  author:
  <input
    id='blogform-author'
    value={props.author}
    onChange={props.authorHandler}
  />
  <br />
  url:
  <input
    id='blogform-url'
    value={props.url}
    onChange={props.urlHandler}
  />
  <br />
  <button id='blogform-create' type='submit'>
    create
  </button>
</form>;

BlogForm.propTypes = {
  blogName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default BlogForm;
