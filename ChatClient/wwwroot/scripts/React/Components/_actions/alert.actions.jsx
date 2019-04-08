import { alertConstants } from "../_constants/alert.constants.jsx";

export const alertActions = {
  success,
  error,
  clear,
  timeout
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

function timeout(message) {
  return { type: alertConstants.ERROR, message };
}
