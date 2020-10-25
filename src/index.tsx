import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./style";
import { Provider } from "react-redux";
import {store } from "./store";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
       <App />
    </Provider>
  </ThemeProvider>
  ,
  document.getElementById("root")
);
serviceWorker.unregister();
