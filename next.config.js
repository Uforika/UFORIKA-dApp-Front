const {
  API_URL, IS_PROD, REDUX_DEBUG, CLIENT_ID, NETWORK
} = require('config');

module.exports = {
  publicRuntimeConfig: {
    API_URL,
    IS_PROD,
    REDUX_DEBUG,
    CLIENT_ID,
    NETWORK
  },
  trailingSlash: true,
};
