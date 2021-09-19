const Blog = ({ blog, likeHandler }) => {
  const likeButton = () => <button onClick={() => likeHandler()}>like</button>;

  if (!blog) { return (null); }

  const output = <div id='blog-element'>
    <h2>{blog.title} - {blog.author}</h2>
    {blog.url} {blog.likes}
    {likeButton()}
  </div>;

  return output;
};

export default Blog;
