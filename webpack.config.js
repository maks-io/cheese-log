const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./build/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: {
      type: "commonjs2",
    },
  },
  externals: {
    react: "react",
    reactDOM: "react-dom",
  },
  resolve: {
    fallback: { util: require.resolve("util/") },
  },
  module: {},
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ context: "./build", from: "./**/*.d.ts", to: "types" }],
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
        },
      }),
    ],
  },
};
