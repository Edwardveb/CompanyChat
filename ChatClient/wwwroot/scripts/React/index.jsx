require("../../content/site.scss");
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Components/_helpers/store.jsx";
import { App } from "./Components/App/App.jsx";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
