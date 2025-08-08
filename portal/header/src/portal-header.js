import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { PortalHeaderApp } from "./portal-header-app";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: PortalHeaderApp,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
