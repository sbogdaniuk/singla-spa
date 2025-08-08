import { navigateToUrl } from "single-spa";
import { AppLink } from "./components/app-link";

export const Links = () => (
  <div style={{ marginTop: "3rem" }}>
    <h4>Link</h4>

    <ul>
      <li>
        <a href="/product/MODEL_1/SEASON_1/costing/bol" onClick={navigateToUrl}>
          /product/MODEL_1/SEASON_1/costing/bol
        </a>
      </li>
      <li>
        <a href="/product/MODEL_3/SEASON_2/costing/bol" onClick={navigateToUrl}>
          /product/MODEL_3/SEASON_2/costing/bol
        </a>
      </li>
      <li>
        <a href="/products" onClick={navigateToUrl}>
          /products
        </a>
      </li>
    </ul>

    <hr />

    <h4>App Link</h4>
    <ol>
      <li>
        <AppLink to="/">/</AppLink>
      </li>
      <li>
        <AppLink to="/costing/bol">/costing/bol</AppLink>
      </li>
      <li>
        <AppLink to="/costing/list">/costing/list</AppLink>
      </li>
    </ol>
  </div>
);
