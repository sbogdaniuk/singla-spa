import { match } from "path-to-regexp";

export function matchRoutes(...routes) {
  return (location) =>
    routes.every(
      (route) =>
        match(`${route}/:rest*`, { decode: decodeURIComponent })(
          location.pathname
        ) !== false
    );
}
