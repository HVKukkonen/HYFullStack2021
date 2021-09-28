import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { logout } from '../reducers/userReducer';

const Navigation = styled(Link)`
  font-size: 1.3em;
  margin: 1em;
  padding: 0.25em 1em;
  color: palevioletred;
  font-weight: bold;
`;

const HeaderText = (props) => <div>
  <Navigation to='/users'>users </Navigation>
  <Navigation to='/blogs'>blogs</Navigation>
  <h2>blogs</h2>
  {props.notification ? <Alert>{props.notification}</Alert> : null}
  <br />
  {`${props.username} logged in`}
  <br />
  <Button variant='contained' color='primary' onClick={() => props.dispatch(logout())}>log out</Button>;
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

HeaderText.propTypes = {
  notification: PropTypes.string,
  username: PropTypes.string,
  dispatch: PropTypes.func,
};

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
