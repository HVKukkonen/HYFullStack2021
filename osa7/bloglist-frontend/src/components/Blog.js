import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, like_handler: likeHandler }) => {
  let output;
  const [show, setShow] = useState(false);
  const showButton = <button onClick={() => setShow(!show)}>{(show) ? 'hide' : 'show'}</button>;
  const likeButton = () => {
    const dispatch = useDispatch();
    const activeTimeout = useSelector((state) => state.timeoutID);

    const notify = (notification) => {
      clearTimeout(activeTimeout);
      const timeoutID = setTimeout(
        () => dispatch(removeNotification()),
        3000,
      );
      dispatch(setNotification(notification, timeoutID));
    };

    notify(`You like ${blog.title}`);

    return (<button onClick={() => likeHandler()}>like</button>)
  };

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
