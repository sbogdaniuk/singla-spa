import angular from "angular";
import singleSpaAngularJS from "single-spa-angularjs";
import "./app";

const ngLifecycles = singleSpaAngularJS({
  angular,
  mainAngularModule: "legacyApp",
  template: `
    <div ng-controller="MainCtrl">
      <h1>{{ message }}</h1>
    </div>
`,
});

export const bootstrap = ngLifecycles.bootstrap;
export const mount = ngLifecycles.mount;
export const unmount = (props) => ngLifecycles.unmount(props);
