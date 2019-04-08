import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers/history.jsx";
import { alertActions } from "../_actions/alert.actions.jsx";
import { userActions } from "../_actions/user.actions.jsx";
import { PrivateRoute } from "../_components/PrivateRoute.jsx";
import { Chat } from "../Chat/Chat.jsx";
import { LoginPage } from "../LoginPage/LoginPage.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      if (location.state === undefined) {
        dispatch(alertActions.clear());
      }
      if (location.state !== undefined && location.state.logout) {
        dispatch(userActions.serverLogout());
      }
      if (location.state !== undefined && (location.state.timeout || location.state.expiredLogin)) {
        dispatch(userActions.logout());
      }
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="row height-100">
        <div className="col my-auto mx-auto">
          {alert.message && <div className={`alert ${alert.type} row`}>{alert.message}</div>}
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={Chat} />
              <Route path="/login" component={LoginPage} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
