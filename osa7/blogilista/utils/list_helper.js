const dummy = () => 1;

// function to convert list of blogs to list of likes
const likesList = (blogs) => blogs.map((blog) => blog.likes);

const totalLikes = (blogs) => {
  const reducer = (sum, value) => sum + value;
  return likesList(blogs).reduce(reducer);
};

const favouriteBlog = (blogs) => {
  const i = likesList(blogs).indexOf(Math.max(...likesList(blogs)));
  return blogs[i];
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
