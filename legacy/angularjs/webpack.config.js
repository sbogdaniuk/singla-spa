const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");

// module.exports = (webpackConfigEnv, argv) => {
//   const defaultConfig = singleSpaDefaults({
//     orgName: "legacy",
//     projectName: "angularjs",
//     webpackConfigEnv,
//     argv,
//     outputSystemJS: false,
//   });

//   const config = merge(defaultConfig, {
//     // modify the webpack config however you'd like to by adding to this object
//   });

//   console.log(1111, "config", config);

//   return config;
// };

module.exports = (webpackConfigEnv, argv) => {
  console.log(1111, "exports", webpackConfigEnv, argv);

  const CONFIG = {
    mode: "development",
    entry: "./src/legacy-angularjs",
    output: {
      filename: "legacy-angularjs.js",
      libraryTarget: "module",
      // path: "/Users/sergeibogdaniuk/work/github/single-spa/legacy/angularjs/dist",
      path: path.resolve(__dirname, "dist"),
      uniqueName: "angularjs",
      devtoolNamespace: "angularjs",
      publicPath: "auto",
    },
    module: {
      // rules: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
    },
    devtool: "source-map",
    devServer: {
      historyApiFallback: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      // client: { webSocketURL:  },
      allowedHosts: "all",
      hot: false,
      // setupMiddlewares: [Function: setupMiddlewares]
    },
    externals: [
      "single-spa",
      /^@legacy\//,
      "react",
      "react-dom",
      "react-dom/client",
    ],
    plugins: [
      // BundleAnalyzerPlugin {
      //   opts: [Object],
      //   server: null,
      //   logger: [Logger]
      // },
      // HtmlWebpackPlugin {
      //   userOptions: {},
      //   version: 5,
      //   options: [Object]
      // }
    ],
    resolve: { extensions: [".mjs", ".js", ".jsx", ".wasm", ".json"] },
    experiments: { outputModule: true },
  };

  return CONFIG;
};
