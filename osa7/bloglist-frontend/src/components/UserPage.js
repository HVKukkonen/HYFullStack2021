const BlogRow = (props) => <tr><td>{props.name}</td></tr>;

const BlogTable = (props) => <table>
  <thead><tr><th>added blogs</th></tr></thead>
  <tbody>
    {props.blogs.map((blog) => <BlogRow key={blog} name={blog}/>)}
  </tbody>
</table>;

const UserPage = (props) => <div>
  <h2>{props.user.username}</h2>
  <BlogTable blogs={props.user.blogs}/>
</div>;

export default UserPage;
