/* eslint-disable */

const httpProxy = require('http-proxy');

console.log(process.env.NODE_PROXY_TARGET);

console.log(process.env.NODE_PROXY_PORT);

const startProxy = () => {
  console.log('代理运行');

  httpProxy
    .createServer({
      target: process.env.NODE_PROXY_TARGET || 'https://www.baidu.com',
      changeOrigin: true,
      secure: false,
    })
    .listen(process.env.NODE_PROXY_PORT || 3000);
};

startProxy();
