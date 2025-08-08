import { NavLink } from "react-router-dom";
import { matchPath } from "react-router";

export const AppNavLink = ({ to, ...rest }) => {
  const result = matchPath(location.pathname, {
    path: "/product/:model?/:season?",
  });

  const { url = "/" } = result || {};

  return (
    <NavLink
      to={[url, to].join("").replace(/([^:])\/{2,}/g, "$1/")}
      {...rest}
    />
  );
};
