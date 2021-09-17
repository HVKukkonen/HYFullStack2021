import { Link } from 'react-router-dom';

const UserRow = (props) => <tr>
  <td><Link to={`users/${props.user.id}`}>{props.user.username}</Link></td><td>{props.user.blogs.length}</td>
</tr>;

const UsersTable = (props) => <table>
  <thead><tr><th></th><th>blogs created</th></tr></thead>
  <tbody>
    {props.users.map((user) => <UserRow key={user.username} user={user} />)}
  </tbody>
</table>;

const AllUsersPage = (props) => <div>
  <h2>Users</h2>
  <UsersTable users={props.users} />
</div>;

export default AllUsersPage;
