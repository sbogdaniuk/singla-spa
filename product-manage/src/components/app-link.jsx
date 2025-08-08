import { Link } from "react-router-dom";
import { matchPath } from "react-router";

export const AppLink = ({ to, ...rest }) => {
  const result = matchPath(location.pathname, {
    path: "/product/:model?/:season?",
  });

  const { url = "/" } = result || {};

  return (
    <Link to={[url, to].join("").replace(/([^:])\/{2,}/g, "$1/")} {...rest} />
  );
};
