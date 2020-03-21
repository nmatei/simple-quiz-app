const path = require("path");

module.exports = env => {
  env = env || { production: false };
  const isProduction = env.production;
  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    devtool: isProduction ? false : "inline-source-map",
    devServer: {
      contentBase: "./public"
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "public")
    }
  };
};
