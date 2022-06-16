/* eslint-disable no-param-reassign */
const express = require('express');

const fs = require('fs');

const path = require('path');

const { createProxyMiddleware } = require('http-proxy-middleware');

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
  app.use(
    '/dev-login',
    createProxyMiddleware({
      target: 'http://localhost:1212/proxy.html',
    })
  );
} else {
  app.use('/dev-login', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    fs.createReadStream(path.join(path.resolve(), 'build', 'index.html')).pipe(
      res
    );
  });
}

app.use('/static', express.static(path.join(path.resolve(), './build/static')));

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000',
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

app.listen(port, () => {
  console.log(`开始监听 ${port}`);
});
