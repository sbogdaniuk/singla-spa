import { version } from "react";
import { navigateToUrl } from "single-spa";

export function BolApp(props) {
  const {
    customProps: { openModal },
  } = props;

  return (
    <div className="app">
      <h3>@costing/bol is mounted!</h3>
      <pre>{JSON.stringify(props.customProps, null, 2)}</pre>
      <div>React – {version}</div>

      <button
        onClick={() => {
          openModal({ count: 11 });
        }}
      >
        openModal
      </button>

      <div>Links</div>

      <ul>
        <li>
          <a
            href="/product/MODEL_1/SEASON_1/costing/bol"
            onClick={navigateToUrl}
          >
            /product/MODEL_1/SEASON_1/costing/bol
          </a>
        </li>

        <li>
          <a href="/product/MODEL_3/SEASON_2" onClick={navigateToUrl}>
            /product/MODEL_3/SEASON_2
          </a>
        </li>
        <li>
          <a
            href="/product/MODEL_3/SEASON_2/costing/bol"
            onClick={navigateToUrl}
          >
            /product/MODEL_3/SEASON_2/costing/bol
          </a>
        </li>
        <li>
          <a
            href="/product/MODEL_3/SEASON_2/costing/list"
            onClick={navigateToUrl}
          >
            /product/MODEL_3/SEASON_2/costing/list
          </a>
        </li>
        <li>
          <a href="/products" onClick={navigateToUrl}>
            /products
          </a>
        </li>
      </ul>
    </div>
  );
}
