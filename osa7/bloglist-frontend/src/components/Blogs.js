import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Blog from './Blog';
import { deleteBlog } from '../reducers/blogReducer';

const Blogs = (props) => {
  const dispatch = useDispatch();

  const removeButton = (id) => <button
    onClick={() => dispatch(deleteBlog(id))}>
    remove
  </button>;

  let blogsElement;
  if (props.blogs) {
    blogsElement = props.blogs.map((blog) => <div key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      {props.user.username === blog.user.username ? removeButton(blog.id) : null} </div>);
  }
  return (
    <div>
      {blogsElement}
    </div>
  );
};

export default Blogs;
