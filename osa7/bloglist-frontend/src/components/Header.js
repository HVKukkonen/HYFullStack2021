import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const LogoutButton = (props) => <button onClick={() => props.dispatch(logout())}>log out</button>;

const Header = (props) => <div>
    <Link to='/users'>users </Link>
    <Link to='/blogs'>blogs</Link>
    <h2>blogs</h2>
    {props.notification}
    <br/>
    {`${props.username} logged in`}
    <br/>
    <LogoutButton dispatch={props.dispatch}/>
  </div>;

export default Header;
