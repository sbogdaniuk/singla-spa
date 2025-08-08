import { Router } from "react-router-dom";
import "./product-manage-app.css";

import { createBrowserHistory } from "history";
import { ProductManageApp } from "./product-manage-app";

export function Root({ history = createBrowserHistory(), ...props }) {
  return (
    <Router history={history} location={window.location}>
      <ProductManageApp {...props} />
    </Router>
  );
}
