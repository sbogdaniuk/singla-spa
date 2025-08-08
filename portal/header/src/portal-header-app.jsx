import { version } from "react";
import "./root.css";
import { Clock } from "./clock";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

export function PortalHeaderApp(props) {
  return (
    <BrowserRouter>
      <header className="app ph-base">
        <h3>{props.name} is mounted!</h3>
        <div>React version – {version}</div>
        <Clock />

        <ul>
          {[
            {
              to: "/",
              label: "Home",
            },
            {
              to: "/products",
              label: "Products",
            },
            {
              to: "/legacy",
              label: "Legacy",
            },
            {
              to: "/some/non/existing/route",
              label: "Not existing route",
            },
          ].map((d) => (
            <li key={d.to}>
              <NavLink to={d.to}>{d.label}</NavLink>
            </li>
          ))}
        </ul>
      </header>
    </BrowserRouter>
  );
}
