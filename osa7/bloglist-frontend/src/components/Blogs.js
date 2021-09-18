import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

const Blogs = (props) => {
  const dispatch = useDispatch();

  const removeButton = (id) => <button
    onClick={() => dispatch(deleteBlog(id))}>
    remove
  </button>;

  const handleLike = (blog, timeoutID) => {
    clearTimeout(timeoutID);
    dispatch(likeBlog(blog));
    dispatch(notify(`You like ${blog.title}`));
  };

  const timeoutID = useSelector((state) => state.notification.timeoutID);
  let blogsElement;
  if (props.blogs) {
    blogsElement = props.blogs.map((blog) => <div key={blog.id}>
      <Blog blog={blog} likeHandler={() => handleLike(blog, timeoutID)} />
      {props.user.username === blog.user.username ? removeButton(blog.id) : null} </div>);
  }
  return (
    <div>
      {blogsElement}
    </div>
  );
};

export default Blogs;
