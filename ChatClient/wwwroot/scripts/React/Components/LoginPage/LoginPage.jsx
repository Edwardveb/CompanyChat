import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { userActions } from "../_actions/user.actions.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      submitted: false,
      isLoggedIn: userActions.checkLoginStatus()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username } = this.state;
    const { dispatch } = this.props;
    if (username) {
      dispatch(userActions.login(username));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, submitted, isLoggedIn } = this.state;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row">
        <div className="col">
          <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className={"form-group" + (submitted && !username ? " has-error" : "")}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
              {submitted && !username && <div className="help-block text-danger">Username is required</div>}
            </div>
            <div className="form-group">
              {loggingIn ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button className="btn btn-primary">Join Chat</button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
