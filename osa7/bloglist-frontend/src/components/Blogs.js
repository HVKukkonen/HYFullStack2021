import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

const Blogs = ({ user }) => {
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

  const blogs = useSelector((state) => state.blogs);
  const timeoutID = useSelector((state) => state.notification.timeoutID);
  let blogsElement;
  if (blogs) {
    blogsElement = blogs.map((blog) => <div key={blog.id}>
      <Blog blog={blog} likeHandler={() => handleLike(blog, timeoutID)} />
      {console.log('user username', user.username)}
      {console.log('blog username', blog.user.username)}
      {user.username === blog.user.username ? removeButton(blog.id) : null} </div>);
  }
  return (
    <div>
      {blogsElement}
    </div>
  );
};

export default Blogs;
