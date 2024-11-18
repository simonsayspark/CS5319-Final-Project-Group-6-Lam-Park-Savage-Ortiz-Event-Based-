// craco.config.js
const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      // Adding fallback configuration for Node.js modules
      config.resolve.fallback = {
        fs: false,
        os: false,
        path: false,
      };

      // Injecting environment variables using DefinePlugin
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      );

      return config;
    },
  },
};
