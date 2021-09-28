import path from 'path';
import fs from 'fs';
import get from 'lodash/get';
import {
    REACT_APP_PROXY_ENV,
    REACT_APP_PROXY_PLAT,
    REACT_APP_PROXY_LOGIN_DOMAIN,
    REACT_APP_PROXY_DJC_GATEWAY_DOMAIN,
} from './constant';

// eslint-disable-next-line max-len
const domainRegx =
    /(http(s)?:)?\/\/(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?(\.|:))+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

export const proxtConfig = () => {
    // 代理登录域
    const proxyDomain = process.env[REACT_APP_PROXY_LOGIN_DOMAIN];

    // 代理大家采网关域
    const proxyDjcGatewayDomain = process.env[REACT_APP_PROXY_DJC_GATEWAY_DOMAIN];

    const port = process.env.PORT;

    const proxyPath = path.resolve(process.cwd(), './project-config/common/proxy');

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
                target: proxyDjcGatewayDomain,
                secure: false,
                changeOrigin: true,
            },
        },
        {
            path: '/djc-gateway/authing/login',
            proxyConfig: {
                target: proxyDjcGatewayDomain,
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
                target: proxyDjcGatewayDomain,
                secure: false,
                changeOrigin: true,
                cookiePathRewrite: '/',
                cookieDomainRewrite: `http://localhost:${port}`,
                hostRewrite: `localhost:${port}`,
                protocolRewrite: 'http',
                onProxyRes: (proxyRes: any) => {
                    const headerInLocation = proxyRes.headers.location;

                    const requestBaseUrl = domainRegx.exec(headerInLocation || '');

                    const reWriteLocation = headerInLocation.replace(
                        requestBaseUrl ? new RegExp(requestBaseUrl[0]) : '',
                        `http://localhost:${port}`
                    );

                    proxyRes.headers.location = reWriteLocation;
                },
            },
        },
        {
            path: '/gateway/v1/login',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
            },
        },
        {
            path: '/gateway/v1/user',
            proxyConfig: {
                target: proxyDjcGatewayDomain,
                secure: false,
                changeOrigin: true,
            },
        },
        ...proxyGroup,
    ];
};
