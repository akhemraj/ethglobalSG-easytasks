module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Disable source-map-loader for specific package
        webpackConfig.module.rules.push({
          test: /\.m?js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /@turnkey\/webauthn-stamper/,
        });
  
        return webpackConfig;
      },
    },
  };