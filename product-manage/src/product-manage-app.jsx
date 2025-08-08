import { Children, useState, version } from "react";
import { matchPath } from "react-router";
import { Router, Route, Switch, useLocation } from "react-router-dom";
import { Links } from "./links";
import { NavBar } from "./nav-bar/nav-bar";
import { Details } from "./page/details";
import { Parcel } from "./parcel";
import { getAppNames } from "single-spa";
import "./product-manage-app.css";

export function ProductManageApp(props) {
  const { singleSpa } = props;
  const location = useLocation();
  const [count, setCount] = useState(0);

  const appNames = singleSpa.getAppNames();

  if (__SINGLE_SPA_STANDALONE__) {
    console.log(1, "Running in standalone mode");
  }

  const path = "/product/:model?/:season?";

  const { params, url } = matchPath(location.pathname, { path });

  const getPath = (path) => `${url}${path}`.replace(/([^:])\/{2,}/g, "$1/");

  function openModal(props) {
    setCount(count + 1);
  }

  const customProps = {
    openModal,
  };

  return (
    <div>
      <h3>@papp/product-manage is mounted!</h3>
      <div>Pathname: {location.pathname}</div>

      <div>React: {version}</div>
      <div>Time: {new Date().toLocaleString()}</div>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
            console.log(1111, "getAppNames", getAppNames());
          }}
        >
          Count – {String(count)}
        </button>
      </div>

      <div className="ppm-base">
        <NavBar calssName="ppm-mavbar" />
        <div className="ppm-content">
          <Switch>
            <Route path={getPath("/")} exact>
              <Details />
              <Links />
            </Route>
            <Route path={getPath("/costing/bol")}>
              {({ match }) => {
                return (
                  <>
                    <Parcel
                      name="@costing/bol"
                      customProps={{
                        params: { ...params, ...match.params },
                        count,
                        ...customProps,
                      }}
                    />
                    <Links />
                  </>
                );
              }}
            </Route>
            <Route path={getPath("/costing/list")}>
              <Parcel
                name="@costing/list"
                customProps={{ params, count, ...customProps }}
              />
              <Links />
            </Route>
            <Route path={getPath("/legacy")}>
              <Parcel
                name="@legacy/angularjs"
                customProps={{ params, count, ...customProps }}
              />
            </Route>
          </Switch>
        </div>
      </div>

      <hr />
      <ul
        style={{ display: "flex", listStyle: "none", padding: 0, gap: "1rem" }}
      >
        {appNames.map((name) => {
          const status = singleSpa.getAppStatus(name);
          return (
            <li key={name}>
              <div>{name}</div>
              <div>
                {status} –
                <button
                  onClick={async () => {
                    console.log(1111, "status", singleSpa.getAppStatus(name));
                  }}
                >
                  status
                </button>
              </div>
              <div>
                <button
                  onClick={async () => {
                    const result = await singleSpa.unregisterApplication(name);
                    console.log(1111, "unregisterApplication", result);
                  }}
                >
                  unregisterApplication
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
