const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify")
    }
  })
);

// const { override, addWebpackPlugin } = require('customize-cra');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// module.exports = override(
//   addWebpackPlugin(new NodePolyfillPlugin())
// );
