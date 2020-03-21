const path = require("path");

module.exports = env => {
  console.warn("Env", env);
  const isProduction = env.production;
  console.info("isProduction", isProduction);

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
