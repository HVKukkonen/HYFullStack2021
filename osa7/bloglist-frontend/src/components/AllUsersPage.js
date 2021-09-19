import { Link } from 'react-router-dom';

const UserRow = (props) => {
  let length;
  if (props.blogs == null) {
    length = 0;
  } else if (Array.isArray(props.blogs)) {
    length = props.blogs.length;
  } else {
    length = 1;
  }

  return (
    <tr>
      <td><Link to={`/users/${props.user.id}`}>{props.user.username}</Link></td><td>{length}</td>
    </tr>
  );
};

const UsersTable = (props) => <table>
  <thead><tr><th></th><th>blogs created</th></tr></thead>
  <tbody>
    {props.users.map((user) => <UserRow
      key={user.username}
      user={user}
      blogs={props.blogs.filter((blog) => blog.user.id === user.id)}
    />)}
  </tbody>
</table>;

const AllUsersPage = (props) => <div>
  <h2>Users</h2>
  <UsersTable users={props.users} blogs={props.blogs}/>
</div>;

export default AllUsersPage;
