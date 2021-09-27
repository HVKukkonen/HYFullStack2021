import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const HeaderText = (props) => <div>
  <Link to='/users'>users </Link>
  <Link to='/blogs'>blogs</Link>
  <h2>blogs</h2>
  {props.notification}
  <br />
  {`${props.username} logged in`}
  <br />
  <button onClick={() => props.dispatch(logout())}>log out</button>;
</div>;

const Header = (props) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);

  return <HeaderText
    username={props.username}
    notification={notification}
    dispatch={dispatch}
  />;
};

export default Header;
