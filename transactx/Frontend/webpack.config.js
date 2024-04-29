// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// module.exports = {
//   // Your existing webpack configuration

//   plugins: [
//     new NodePolyfillPlugin()
//   ]
// };

module.exports = {
    // Other configurations...
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "fs": false, // Use false if you don't need fs or find a suitable polyfill
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "net": false // Use false if you don't need net or find a suitable polyfill
      },
      "browser": {
        "fs": false,
        "path": false,
        "crypto": false,
        "stream": false,
        "http": false,
        "net": false
      }
    }
  };
  