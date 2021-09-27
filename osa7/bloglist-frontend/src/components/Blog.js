import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentBlog, likeBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

const CommentForm = (props) => <form
  onSubmit={props.onSubmit}>
  <input
    value={props.comment}
    onChange={props.commentHandler}
  />
  <button type='submit'>
    add comment
  </button>
</form>;

const Comment = (props) => <div id='blog-comment'>
  {props.comment}
</div>;

const handleSubmit = (event, setComment, dispatch, comment, id) => {
  event.preventDefault();
  // clear form
  setComment('');
  dispatch(commentBlog(comment, id));
};

const handleLike = (blog, toutID, dispatch) => {
  clearTimeout(toutID);
  dispatch(likeBlog(blog));
  dispatch(notify(`You like ${blog.title}`));
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const timeoutID = useSelector((state) => state.notification.timeoutID);

  const likeButton = () => <button
    onClick={() => handleLike(blog, timeoutID, dispatch)}>like
  </button>;

  // comment form state
  const [comment, setComment] = useState('');
  const commentHandler = (charEvent) => setComment(charEvent.target.value);

  if (!blog) { return (null); }

  const output = <div id='blog-element'>
    <h2>{blog.title} - {blog.author}</h2>
    {blog.url}
    <br/>
    {blog.likes} {likeButton()}
    <br/>
    added by {blog.user.username}
    <h3>comments</h3>
    <CommentForm
      comment={comment}
      commentHandler={commentHandler}
      onSubmit={(event) => handleSubmit(event, setComment, dispatch, comment, blog.id)}
    />
    {blog.comments.filter(Boolean).map((c) => <Comment key={c} comment={c}/>)}
  </div>;

  return output;
};

export default Blog;
