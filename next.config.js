const {
  API_URL, IS_PROD, REDUX_DEBUG,
} = require('config');

module.exports = {
  publicRuntimeConfig: {
    API_URL,
    IS_PROD,
    REDUX_DEBUG,
  },
  trailingSlash: true,
};
