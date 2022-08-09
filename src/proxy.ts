import path from 'path';
import fs from 'fs';
import get from 'lodash/get';
import {
    REACT_APP_PROXY_ENV,
    REACT_APP_PROXY_PLAT,
    REACT_APP_PROXY_LOGIN_DOMAIN,
} from './constant';

// eslint-disable-next-line max-len
const domainRegx =
    /(http(s)?:)?\/\/(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?(\.|:))+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

const onProxyReq = proxyConfig => (proxyReq, req, res) => {
    if (proxyConfig && proxyConfig.onProxyReq && typeof proxyConfig.onProxyReq === 'function') {
        proxyConfig.onProxyReq(proxyReq, req, res);
    }

    const headersCookie = get(req, 'headers.cookie');

    if (headersCookie) {
        proxyReq.setHeader(
            'cookie',
            headersCookie.replace(`_proxy_domain_${get(proxyReq, 'host')}`, 'Auth')
        );
    }
};

export const proxtConfig = () => {
    // 代理登录域
    const proxyDomain = process.env[REACT_APP_PROXY_LOGIN_DOMAIN];

    const port = process.env.PORT;

    const proxyPath = path.resolve(process.cwd(), './project-config/common/proxy.js');

    // 代理配置
    const proxyConfig = fs.existsSync(proxyPath) ? require(proxyPath) : {};

    const proxyGroup = get(
        proxyConfig,
        `${process.env[REACT_APP_PROXY_ENV]}.${process.env[REACT_APP_PROXY_PLAT]}`,
        []
    );

    return [
        {
            path: '/djc-gateway/djcsupport/domainname/getPlatformConfigure',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
            },
        },
        {
            path: '/djc-gateway/authing/logout',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
            },
        },
        {
            path: '/djc-gateway/authing/v1/sync-login',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
                router: req => {
                    const query = get(req, 'query', {});

                    const { _proxy_domain_ } = query;

                    if (_proxy_domain_) {
                        return _proxy_domain_;
                    }

                    return proxyDomain;
                },
            },
        },
        {
            path: '/djc-gateway/authing/login',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
                cookiePathRewrite: '/',
                cookieDomainRewrite: `http://localhost:${port}`,
                hostRewrite: `localhost:${port}`,
                protocolRewrite: 'http',
            },
        },
        {
            path: '/djc-gateway/authing/oauth/authorize',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
                cookiePathRewrite: '/',
                cookieDomainRewrite: 'localhost',
                hostRewrite: `localhost:${port}`,
                protocolRewrite: 'http',
                router: req => {
                    const query = get(req, 'query', {});

                    const { _proxy_domain_ } = query;

                    if (_proxy_domain_) {
                        return _proxy_domain_;
                    }

                    return proxyDomain;
                },
                onProxyRes: (proxyRes: any, req) => {
                    const headerInLocation = proxyRes.headers.location;

                    const requestBaseUrl = domainRegx.exec(headerInLocation || '');

                    const reWriteLocation = headerInLocation.replace(
                        requestBaseUrl ? new RegExp(requestBaseUrl[0]) : '',
                        `http://localhost:${port}`
                    );

                    const query = get(req, 'query', {});

                    const { _proxy_domain_ } = query;

                    proxyRes.headers.location = `${reWriteLocation}${
                        _proxy_domain_ ? `&_proxy_domain_=${_proxy_domain_}` : ''
                    }`;
                },
            },
        },
        {
            path: '/gateway/v1/login',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
                cookiePathRewrite: '/',
                cookieDomainRewrite: 'localhost',
                router: req => {
                    const query = get(req, 'query', {});

                    const { _proxy_domain_ } = query;

                    if (_proxy_domain_) {
                        return _proxy_domain_;
                    }

                    return proxyDomain;
                },
                onProxyRes: (proxyRes: any) => {
                    const headersSetCookie = proxyRes.headers['set-cookie'];

                    const cookieRegex = /([^=]*Auth)=([\s\S]+)/;

                    const host = get(proxyRes, 'client.servername');

                    if (Array.isArray(headersSetCookie)) {
                        proxyRes.headers['set-cookie'] = headersSetCookie.map(cookieStr => {
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
            },
        },
        {
            path: '/gateway/v1/user',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
                onProxyReq: onProxyReq(proxyConfig),
            },
        },
        ...proxyGroup.map(proxy => {
            const { proxyConfig } = proxy;
            return {
                ...proxy,
                proxyConfig: {
                    ...(proxyConfig || {}),
                    changeOrigin: true,
                    onProxyReq: onProxyReq(proxyConfig),
                },
            };
        }),
    ];
};
