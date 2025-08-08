import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Root } from "./root";
import { addLocalImportMap } from "./utils/add-local-import-map";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount, update } = lifecycles;

function loadSystemJS() {
  return new Promise((resolve) => {
    const systemjsScript = document.createElement("script");
    systemjsScript.src =
      "https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js";
    systemjsScript.onload = () => {
      resolve("systemjsScript LOADED");
    };
    document.head.appendChild(systemjsScript);
  });
}

export const bootstrap1 = async (props) => {
  if (__SINGLE_SPA_STANDALONE__) {
    addLocalImportMap({
      react: "https://esm.sh/react@19.0.0?dev",
      "react-dom": "https://esm.sh/react-dom@19.0.0?dev",
      "react-dom/client": "https://esm.sh/react-dom@19.0.0/client?dev",
    });
  }

  addLocalImportMap({
    "@costing/bol": "http://localhost:7001/costing-bol.js",
    "@costing/list": "http://localhost:7002/costing-list.js",
  });

  await loadSystemJS();

  return lifecycles.bootstrap(props);
};
