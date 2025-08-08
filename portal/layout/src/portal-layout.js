import {
  registerApplication,
  start,
  MOUNTED,
  NOT_MOUNTED,
  pathToActiveWhen,
  checkActivityFunctions,
  getMountedApps,
} from "single-spa";
import "./app.css";
import { matchRoutes } from "./utils";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import HomePage from "./home.html";
import NotFoundPage from "./404.html";

// initial loading
const layoutNode = document.getElementById("root-layout");
const loaderNode = document.getElementById("root-loader");

layoutNode?.classList.add("none");
loaderNode?.classList.remove("none");

// --------------------------------------------------------
// SINGLE SPA LAYOUT
if (false) {
  const routes = constructRoutes(document.querySelector("#single-spa-layout"));

  const applications = constructApplications({
    routes,
    loadApp: ({ name }) =>
      import(
        /* webpackIgnore: true */ // @ts-ignore-next
        name
      ),
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });

  applications.forEach((application) => {
    registerApplication({
      ...application,

      // async beforeMount() {
      //   console.log("Creating mount container...");
      //   createContainer("legacy-container");
      // },

      // async afterUnmount() {
      //   console.log("Removing mount container...");
      //   removeContainer("legacy-container");
      // },
    });
  });
}
// --------------------------------------------------------

// --------------------------------------------------------
// Manually

const NAME_TO_ID = {
  "@portal/header": "single-spa:portal-header",
  "@products/search": "single-spa:products-search",
  "@legacy/angularjs": "single-spa:legacy-angularjs",
  "@papp/product-manage": "single-spa:papp-product-manage",
  "html-only-app": "single-spa:html-only-app",
  "not-found": "single-spa:not-found",
};

const mainContentNode = document.getElementById("main-content");

if (true) {
  const MAIN_APPS_CONFIGS = [
    {
      name: "@products/search",
      activeWhen: pathToActiveWhen("/products", true),
    },
    {
      name: "@legacy/angularjs",
      activeWhen: "/legacy",
    },
    {
      name: "@papp/product-manage",
      activeWhen: pathToActiveWhen("/product/:season?/:model?"),
    },
    {
      name: "html-only-app",
      app: () =>
        Promise.resolve({
          bootstrap: () => Promise.resolve(),
          mount: ({ domElementGetter }) => {
            const node = domElementGetter();
            node.innerHTML = HomePage;

            return Promise.resolve();
          },
          unmount: () => Promise.resolve(),
        }),
      activeWhen: pathToActiveWhen("/", true),
    },
  ];

  [
    {
      name: "@portal/header",
      activeWhen: "/",
    },
    ...MAIN_APPS_CONFIGS,
    {
      // SHOULD be last
      name: "not-found",
      app: () =>
        Promise.resolve({
          bootstrap: () => Promise.resolve(),
          mount: ({ domElementGetter }) => {
            const node = domElementGetter();
            node.innerHTML = NotFoundPage;

            return Promise.resolve();
          },
          unmount: () => Promise.resolve(),
        }),
      activeWhen: (location) => {
        // Check if any other app is active
        const hasMatch = MAIN_APPS_CONFIGS.some(({ activeWhen }) => {
          // for multi route cases, like activeWhen: ['', () => {}]
          const fns = [activeWhen]
            .flat()
            .map((fn) => (typeof fn === "string" ? pathToActiveWhen(fn) : fn));
          return fns.some((fn) => fn(location));
        });

        return !hasMatch;
      },
    },
  ].map((config) => {
    registerApplication({
      app: ({ name }) =>
        import(
          /* webpackIgnore: true */ // @ts-ignore-next
          name
        ),
      customProps: (name) => {
        const nodeId = NAME_TO_ID[name];
        return {
          customProps: { name, nodeId },
          domElementGetter: () => document.getElementById(nodeId),
        };
      },
      ...config,
    });
  });
}

// --------------------------------------------------------

start();

// A single-spa:before-mount-routing-event event is fired after before-routing-event and before routing-event.
// It is guaranteed to fire AFTER all single-spa applications have been UNMOUNTED, but BEFORE any new applications have been MOUNTED.
window.addEventListener("single-spa:before-mount-routing-event", (evt) => {
  console.log(222, "single-spa is about to mount/unmount applications!");

  // Create newly MOUNTED app nodes
  evt.detail.appsByNewStatus[MOUNTED].map((name) => {
    addAppNode(NAME_TO_ID[name], { parent: mainContentNode });
  });

  // Remove UNMOUNTED nodes
  evt.detail.appsByNewStatus[NOT_MOUNTED].map((name) => {
    removeAppNode(NAME_TO_ID[name]);
  });
});

function addAppNode(
  id = "app",
  { tagName = "div", parent = document.body } = {}
) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement(tagName);
    el.id = id;
    el.innerHTML = `<div><span class="inline-spinner" aria-label="Loading..."></span> – ${id}</div>`;
    parent.appendChild(el);
  }
}

function removeAppNode(id = "app") {
  let el = document.getElementById(id);
  if (el) el.remove();
}

window.addEventListener("single-spa:before-first-mount", () => {
  console.log(
    111,
    "single-spa is about to mount the very first application for the first time"
  );

  layoutNode?.classList.remove("none");
  loaderNode?.classList.add("none");
});
