const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    entry: {
      index: "./src/index.ts"
    },
    devtool: isProduction ? false : "inline-source-map",
    devServer: {
      static: ["src"],
      watchFiles: ["src/**/*.*"]
    },
    optimization: {
      minimize: true,
      minimizer: ["...", new CssMinimizerPlugin()],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        minify: true,
        chunks: ["index"],
        filename: "index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader"
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource"
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      filename: "js/[name].js",
      assetModuleFilename: "images/[name].[hash:8][ext][query]",
      path: path.resolve(__dirname, "docs"),
      publicPath: "",
      environment: {
        arrowFunction: false
      }
    },
    target: ["web", "es5"]
  };
};
