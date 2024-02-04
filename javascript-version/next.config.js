const path = require('path');

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    };
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', // Adds CSS to the DOM by injecting a <style> tag
        'css-loader', // interprets @import and url() like import/require() and will resolve them
        'sass-loader' // Compiles Sass to CSS
      ],
    });

    return config;
  },
};
