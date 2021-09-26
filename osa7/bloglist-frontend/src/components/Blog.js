import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogReducer';

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

const Blog = ({ blog, likeHandler }) => {
  const likeButton = () => <button onClick={() => likeHandler()}>like</button>;

  // comment form state
  const [comment, setComment] = useState('');
  const commentHandler = (charEvent) => setComment(charEvent.target.value);

  const dispatch = useDispatch();

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
