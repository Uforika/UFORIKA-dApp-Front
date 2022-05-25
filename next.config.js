const {
  API_URL, IS_PROD, REDUX_DEBUG, CLIENT_ID,COIN_GECKO_API_URL, NETWORK
} = require('config');
const { withPlugins } = require('next-compose-plugins');
const withSvgr = require('@newhighsco/next-plugin-svgr')

const withSvgrConfig = {
  svgrOptions: {
    typescript: true,
    dimensions: false
  }
}

const runtimeConfig= {
  publicRuntimeConfig: {
    API_URL,
    IS_PROD,
    REDUX_DEBUG,
    CLIENT_ID,
    COIN_GECKO_API_URL,
    NETWORK
  },
  trailingSlash: true,
};

module.exports = withPlugins([
  runtimeConfig,
  [withSvgr, withSvgrConfig]
]);
