import cn from "clsx";
import { AppNavLink } from "../components/app-nav-link";
import "./navbar.css";

export const NavBar = (props) => {
  return (
    <div className={cn("pmn-navbar", props.className)}>
      <ul>
        {[
          {
            to: "/",
            label: "Product Data",
            exact: true,
          },
          {
            to: "/costing/bol",
            label: "BOL",
          },
          {
            to: "/costing/list",
            label: "List",
          },
          {
            to: "/legacy",
            label: "Legacy",
          },
        ].map((d) => (
          <li key={d.to}>
            <AppNavLink
              exact={d.exact}
              to={d.to}
              className={(isActive) =>
                [
                  "pmn-nav-link",
                  isActive ? "pmn-selected" : "pmn-unselected",
                ].join(" ")
              }
            >
              {d.label}
            </AppNavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
