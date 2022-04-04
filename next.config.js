const {
  API_URL, IS_PROD, REDUX_DEBUG,
} = require('config');
const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    API_URL,
    IS_PROD,
    REDUX_DEBUG,
  },
  trailingSlash: true,
});
