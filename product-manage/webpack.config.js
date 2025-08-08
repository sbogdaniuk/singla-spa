const { merge } = require("webpack-merge");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const lodash = require("lodash");

module.exports = (webpackConfigEnv, argv) => {
  const isStandalone = webpackConfigEnv.standalone === true;

  const defaultConfig = singleSpaDefaults({
    orgName: "papp",
    projectName: "product-manage",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  const config = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new webpack.DefinePlugin({
        __SINGLE_SPA_STANDALONE__: JSON.stringify(isStandalone),
      }),
    ],
  });

  return {
    ...config,
    externals: lodash.difference(config.externals, [
      "react",
      "react-dom",
      "react-dom/client",
    ]),
  };
};
