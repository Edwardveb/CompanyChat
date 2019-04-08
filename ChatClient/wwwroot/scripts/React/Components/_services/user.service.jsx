import config from "config";

export const userService = {
  login,
  logout,
  serverLogout,
  checkLoginStatus
};

function login(username) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  };

  return fetch(`${config.apiUrl}/chat/connect`, requestOptions)
    .catch(() => {
      const error = "Failed to connect to server.";
      return Promise.reject(error);
    })
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function serverLogout() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) return;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify({ username: user.username })
  };

  fetch(`${config.apiUrl}/chat/disconnect`, requestOptions);
  logout();
}

function checkLoginStatus() {
  return JSON.parse(localStorage.getItem("user")) !== null;
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
