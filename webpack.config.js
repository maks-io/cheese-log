const path = require("path");

module.exports = {
  mode: "production",
  entry: "./build-tmp/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    fallback: { util: require.resolve("util/") },
  },
  module: {},
  optimization: {
    usedExports: true,
    minimize: true,
  },
};
