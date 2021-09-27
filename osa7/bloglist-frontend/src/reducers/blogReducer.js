import blogService from '../services/blogs';

// HELPERS ---------------------------------------
// return blogs sorted by likes in descending order
export const sortBlogs = (blogs) => blogs.sort(
  (a, b) => b.likes - a.likes,
);

// ACTION CREATORS ----------------------------------------------------
export const createBlog = (blog) => async (dispatch) => {
  // backend
  const newBlog = await blogService.create(blog);
  // redux store
  dispatch(
    {
      type: 'BLOG-CREATE',
      data: { blog: newBlog },
    },
  );
};

export const initBlogs = () => async (dispatch) => {
  let blogs = await blogService.getAll();
  blogs = sortBlogs(blogs);
  dispatch(
    {
      type: 'BLOG-INIT',
      data: { blogs },
    },
  );
};

export const likeBlog = (blog) => async (dispatch) => {
  blog.likes += 1;
  const updated = await blogService.update(blog);
  dispatch({
    type: 'BLOG-UPDATE',
    data: { blog: updated },
  });
};

export const deleteBlog = (id) => {
  blogService.remove(id);
  return ({
    type: 'BLOG-DELETE',
    data: { id },
  });
};

export const commentBlog = (comment, id) => async (dispatch) => {
  const updated = await blogService.comment(comment, id);
  dispatch({
    type: 'BLOG-COMMENT',
    data: { blog: updated },
  });
};

// REDUCER
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'BLOG-INIT':
      return action.data.blogs;
    case 'BLOG-CREATE':
      // state is an array of blogs
      return state.concat(action.data.blog);
    case 'BLOG-UPDATE': {
      const updated = action.data.blog;
      return state.filter((blog) => blog.id !== updated.id).concat(updated);
    }
    case 'BLOG-DELETE':
      return state.filter((blog) => blog.id !== action.data.id);
    case 'BLOG-COMMENT': {
      const updated = action.data.blog;
      return state.filter((blog) => blog.id !== updated.id).concat(updated);
    }
    default:
      return state;
  }
};

export default blogReducer;
