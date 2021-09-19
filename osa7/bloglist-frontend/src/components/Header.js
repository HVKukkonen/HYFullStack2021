import { logout } from '../reducers/userReducer';

const LogoutButton = (props) => <button onClick={() => props.dispatch(logout())}>log out</button>;

const Header = (props) => <div>
    <h2>blogs</h2>
    {props.notification}
    <br/>
    {`${props.username} logged in`}
    <br/>
    <LogoutButton dispatch={props.dispatch}/>
  </div>;

export default Header;
