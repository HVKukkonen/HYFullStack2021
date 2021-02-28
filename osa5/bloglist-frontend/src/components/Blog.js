import React, { useState } from 'react'

const Blog = ({ blog, like_handler }) => {
  let output;
  const [show, setShow] = useState(false);
  const show_button = <button onClick={() => setShow(!show)}>{(show) ? 'hide' : 'show'}</button>
  if (show) {
    output = <div id='blog-element'>
    {blog.title} {blog.author} {blog.url} {blog.likes}
    {show_button}
    <button onClick={() => like_handler()}>like</button>
    </div>;
  } else {
    output = <div id='blog-element'>
      {blog.title} {blog.author} {show_button}
    </div>;
  }

  return output;
};

export default Blog
