import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, likeHandler }) => {
  let output;
  const [show, setShow] = useState(false);
  const showButton = <button onClick={() => setShow(!show)}>{(show) ? 'hide' : 'show'}</button>;
  const likeButton = () => <button onClick={() => likeHandler()}>like</button>;

  if (show) {
    output = <div id='blog-element'>
    {blog.title} {blog.author} {blog.url} {blog.likes}
    {showButton}
    {likeButton()}
    </div>;
  } else {
    output = <div id='blog-element'>
      {blog.title} {blog.author} {showButton}
    </div>;
  }

  return output;
};

export default Blog;
