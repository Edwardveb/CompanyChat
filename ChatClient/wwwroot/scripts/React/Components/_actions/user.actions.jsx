import { userConstants } from "../_constants/user.constants.jsx";
import { userService } from "../_services/user.service.jsx";
import { alertActions } from "./alert.actions.jsx";
import { history } from "../_helpers/history.jsx";

export const userActions = {
  login,
  logout,
  serverLogout,
  checkLoginStatus
};

function login(username) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function serverLogout() {
  userService.serverLogout();
  return { type: userConstants.LOGOUT };
}

function checkLoginStatus() {
  return userService.checkLoginStatus();
}
