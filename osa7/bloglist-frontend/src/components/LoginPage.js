const LoginPage = (props) => <form onSubmit={props.loginFormAction}>
  <h1>log in to application</h1>
  <br />
  username:
  <input
    value={props.usernameHolder}
    onChange={props.usernameHandler}
  />
  <br />
  password:
  <input
    value={props.passwordHolder}
    onChange={props.passwordHandler}
  />
  <br />
  <button type='submit'>
    login
  </button>
</form>;

export default LoginPage;
