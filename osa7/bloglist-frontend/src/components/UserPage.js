const BlogRow = (props) => <tr><td>{props.name}</td></tr>;

const BlogTable = (props) => <table>
  <thead><tr><th>added blogs</th></tr></thead>
  <tbody>
    {props.blogs.map((blog) => <BlogRow key={blog.id} name={blog.title}/>)}
  </tbody>
</table>;

const UserPage = (props) => <div>
  <h2>{props.user ? props.user.username : null}</h2>
  <BlogTable blogs={props.blogs}/>
</div>;

export default UserPage;
