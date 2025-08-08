const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "portal";
  const projectName = "layout";

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const config = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new webpack.container.ModuleFederationPlugin({
        name: projectName,
        filename: "remoteEntry.js",
        exposes: {
          "./utils": "./src/utils.js",
        },
        shared: {},
      }),
    ],
  });

  return config;
};
