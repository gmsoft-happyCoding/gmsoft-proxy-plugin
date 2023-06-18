const httpProxy = require('http-proxy');

const startProxy = () => {
  httpProxy
    .createServer({
      target: 'https://www.baidu.com',
      changeOrigin: true,
      secure: false,
    })
    .listen(5173);
};

export default startProxy;
