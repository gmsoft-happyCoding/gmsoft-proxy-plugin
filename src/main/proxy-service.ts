/* eslint-disable no-param-reassign */
const express = require('express');

const fs = require('fs');

const http = require('http');

const path = require('path');

const { createProxyMiddleware } = require('http-proxy-middleware');

const startService = () => {
  const app = express();

  const port = 8000;

  // eslint-disable-next-line max-len
  const domainRegx =
    /(http(s)?:)?\/\/(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?(\.|:))+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

  app.use(
    '/manifest.json',
    express.static(path.join(path.resolve(), './build/static/manifest.json'))
  );

  if (process.env.NODE_ENV === 'development') {
    app.use('/dev-login', (req, res) => {
      const httpReq = http.request(
        {
          port: '1212',
          path: '/proxy.html',
          methods: 'GET',
          headers: {
            'Content-Type': 'text/html',
          },
        },
        (httpRes) => {
          httpRes.setEncoding('utf8');

          httpRes.on('data', (response) => {
            res.end(response);
          });
        }
      );

      httpReq.on('error', (response) => {
        res.end('错误');
      });

      httpReq.end();
    });

    app.use(
      '/',
      createProxyMiddleware({
        target: 'http://localhost:1212',
      })
    );
  } else {
    app.use('/dev-login', (req, res) => {
      res.setHeader('Content-Type', 'text/html');

      fs.createReadStream(
        path.join(path.resolve(), 'build', 'proxy.html')
      ).pipe(res);
    });
  }

  app.use(
    '/static',
    express.static(path.join(path.resolve(), './build/static'))
  );

  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      onProxyReq: (proxyRes, req, res) => {
        //  console.log(req);
        //  console.log(proxyRes);
      },
      onProxyRes: (proxyRes, req, res) => {
        // console.log(req);
        //  console.log(proxyRes);
      },
    })
  );

  app.use(
    '/djc-gateway/authing/login',
    createProxyMiddleware({
      target: 'https://www.gpwbeta.com',
      secure: false,
      changeOrigin: true,
      cookiePathRewrite: '/',
      cookieDomainRewrite: `http://localhost:8000`,
      hostRewrite: `localhost:8000`,
      protocolRewrite: 'http',
    })
  );

  app.use(
    '/djc-gateway/authing/oauth/authorize',
    createProxyMiddleware({
      target: 'https://www.gpwbeta.com',
      secure: false,
      changeOrigin: true,
      cookiePathRewrite: '/',
      cookieDomainRewrite: `http://localhost:8000`,
      hostRewrite: `localhost:${port}`,
      protocolRewrite: 'http',
      onProxyRes: (proxyRes) => {
        const headerInLocation = proxyRes.headers.location;

        const requestBaseUrl = domainRegx.exec(headerInLocation || '');

        const reWriteLocation = headerInLocation.replace(
          requestBaseUrl ? new RegExp(requestBaseUrl[0]) : '',
          `http://localhost:8000`
        );

        proxyRes.headers.location = reWriteLocation;
      },
    })
  );

  app.use(
    '/gateway/v1/login',
    createProxyMiddleware({
      target: 'https://www.gpwbeta.com',
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    '/gateway/v1/user',
    createProxyMiddleware({
      target: 'https://www.gpwbeta.com',
      secure: false,
      changeOrigin: true,
    })
  );

  const server = app.listen(port, () => {
    console.log(`开始监听 ${port}`);
  });

  return server;
};

export default startService;
