const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/resized_images/**', {
    target: 'https://d2xtdlq94v40ku.cloudfront.net',
    logLevel: 'debug',
    changeOrigin: true
  }));
  app.use(proxy('/client-assets/**', {
    target: 'https://d2xtdlq94v40ku.cloudfront.net',
    logLevel: 'debug',
    changeOrigin: true
  }));
  app.use(proxy('/assets/**', {
    target: 'https://d2xtdlq94v40ku.cloudfront.net',
    logLevel: 'debug',
    changeOrigin: true
  }));
  app.use(proxy('/api/**', {
    target: 'https://d2xtdlq94v40ku.cloudfront.net',
    logLevel: 'debug',
    changeOrigin: true
  }));
};
