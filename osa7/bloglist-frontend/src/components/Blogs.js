import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from '@material-ui/core';
import { deleteBlog } from '../reducers/blogReducer';

const Blogs = (props) => {
  const dispatch = useDispatch();

  const removeButton = (id) => <button
    onClick={() => dispatch(deleteBlog(id))}>
    remove
  </button>;

  let blogsElement;
  if (props.blogs) {
    blogsElement = props.blogs.map((blog) => <TableRow key={blog.id}>
      <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></TableCell>
      <TableCell>
        {props.user.username === blog.user.username ? removeButton(blog.id) : null}
      </TableCell>
    </TableRow>);
  }
  return (
    <TableContainer>
      <Table>
        <TableBody>{blogsElement}</TableBody>
      </Table>
    </TableContainer>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object,
};

export default Blogs;
