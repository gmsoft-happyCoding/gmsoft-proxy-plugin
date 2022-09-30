/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
const express = require('express');

const fs = require('fs');

const path = require('path');

const lodash = require('lodash');

const { createProxyMiddleware } = require('http-proxy-middleware');

const PROXY_DOMAIN = 'https://www.gpwbeta.com';

/**
 *
 * @param req  any
 * @param proxyDomain string
 * @returns string
 * @des {
        const query = lodash.get(req, 'query', {});

        const { _proxy_domain_ } = query;

        if (_proxy_domain_) {
          return _proxy_domain_;
        }

        return PROXY_DOMAIN;
      },
 */
const routerRule = (req: any, proxyDomain: string) => {
  const query = lodash.get(req, 'query', {});

  const { _proxy_domain_ } = query;

  if (_proxy_domain_) {
    return _proxy_domain_;
  }

  return proxyDomain;
};

const onProxyReq = (proxyReq: any, req: any, _res: any) => {
  const headersCookie = lodash.get(req, 'headers.cookie');

  if (headersCookie) {
    proxyReq.setHeader(
      'cookie',
      headersCookie.replace(
        `_proxy_domain_${lodash.get(proxyReq, 'host')}`,
        'Auth'
      )
    );
  }
};

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

  app.use(
    '/static',
    express.static(path.join(path.resolve(), './build/static'))
  );

  app.use(
    '/djc-gateway/authing/login',
    createProxyMiddleware({
      target: PROXY_DOMAIN,
      secure: false,
      changeOrigin: true,
      cookiePathRewrite: '/',
      cookieDomainRewrite: `http://localhost:8000`,
      hostRewrite: `localhost:8000`,
      protocolRewrite: 'http',
      //  onProxyReq: fixRequestBody,
    })
  );

  app.use(
    '/djc-gateway/authing/v1/sync-login',
    createProxyMiddleware({
      target: PROXY_DOMAIN,
      secure: false,
      changeOrigin: true,
      router: (req: any) => routerRule(req, PROXY_DOMAIN),
    })
  );

  app.use(
    '/djc-gateway/authing/oauth/authorize',
    createProxyMiddleware({
      target: PROXY_DOMAIN,
      secure: false,
      changeOrigin: true,
      cookiePathRewrite: '/',
      cookieDomainRewrite: `http://localhost:8000`,
      hostRewrite: `localhost:${port}`,
      protocolRewrite: 'http',
      router: (req: any) => routerRule(req, PROXY_DOMAIN),
      onProxyRes: (proxyRes: any, req: any) => {
        const headerInLocation = proxyRes.headers.location;

        const requestBaseUrl = domainRegx.exec(headerInLocation || '');

        const reWriteLocation = headerInLocation.replace(
          requestBaseUrl ? new RegExp(requestBaseUrl[0]) : '',
          `http://localhost:${port}`
        );

        const query = lodash.get(req, 'query', {});

        const { _proxy_domain_ } = query;

        proxyRes.headers.location = `${reWriteLocation}${
          _proxy_domain_ ? `&_proxy_domain_=${_proxy_domain_}` : ''
        }`;
      },
    })
  );

  app.use(
    '/gateway/v1/login',
    createProxyMiddleware({
      target: PROXY_DOMAIN,
      secure: false,
      changeOrigin: true,
      cookiePathRewrite: '/',
      cookieDomainRewrite: 'localhost',
      router: (req: any) => routerRule(req, PROXY_DOMAIN),
      onProxyRes: (proxyRes: any) => {
        const headersSetCookie = proxyRes.headers['set-cookie'];

        const cookieRegex = /([^=]*Auth)=([\s\S]+)/;

        const host = lodash.get(proxyRes, 'client.servername');

        if (Array.isArray(headersSetCookie)) {
          proxyRes.headers['set-cookie'] = headersSetCookie.map((cookieStr) => {
            const cookieMatch = cookieStr.match(cookieRegex);

            if (cookieMatch) {
              return cookieStr.replace(
                cookieMatch ? cookieMatch[1] : '',
                `_proxy_domain_${host}`
              );
            }

            return cookieStr;
          });
        }

        if (typeof headersSetCookie === 'string') {
          const cookieMatch = headersSetCookie.match(cookieRegex);

          if (cookieMatch) {
            proxyRes.headers['set-cookie'] = headersSetCookie.replace(
              cookieMatch[1],
              `_proxy_domain_${host}`
            );
          }
        }
      },
    })
  );

  app.use(
    '/gateway/v1/user',
    createProxyMiddleware({
      target: PROXY_DOMAIN,
      secure: false,
      changeOrigin: true,
      onProxyReq,
    })
  );

  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/dev-login',
      createProxyMiddleware({
        target: 'http://localhost:1212',
        pathRewrite: { '/dev-login': '' },
        router: (req: any) => {
          const originalUrl = lodash.get(req, 'originalUrl');

          if (originalUrl === '/dev-login') {
            return 'http://localhost:1212/dev-login';
          }

          return 'http://localhost:1212';
        },
        onProxyReq: (proxyReq, req, res) => {
          // console.log(proxyReq);

          console.log('/dev-login页面请求静态资源');
        },
      })
    );
  } else {
    app.use('/dev-login', (_req: any, res: any) => {
      res.setHeader('Content-Type', 'text/html');

      fs.createReadStream(
        path.join(path.resolve(), 'build', 'proxy.html')
      ).pipe(res);
    });
  }

  const server = app.listen(port, () => {
    console.log(`开始监听 ${port}`);
  });

  return server;
};

export default startService;
