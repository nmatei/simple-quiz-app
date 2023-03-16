const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.ts",
    devtool: isProduction ? false : "inline-source-map",
    devServer: {
      static: "./public",
      watchFiles: ["src/**/*.*"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "public")
    }
  };
};
