//External imports
import React from "react";
import { render } from "react-dom";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Local imports
import App from "./App";
import rootreducer from "./reducers";

//Assests
import "./index.css";

const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
