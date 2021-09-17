import { logout } from '../reducers/userReducer';

const LogoutButton = (props) => <button onClick={() => props.dispatch(logout())}>log out</button>;

const Header = (props) => <div>
    <h2>blogs</h2>
    {props.notification}
    {`${props.username} logged in`}
    <LogoutButton dispatch={props.dispatch}/>
  </div>;

export default Header;
