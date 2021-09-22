import path from 'path';
import get from 'lodash/get';
import {
    REACT_APP_PROXY_ENV,
    REACT_APP_PROXY_PLAT,
    REACT_APP_PROXY_LOGIN_DOMAIN,
    REACT_APP_PROXY_DJC_GATEWAY_DOMAIN,
} from './constant';

export const proxtConfig = () => {
    // 代理登录域
    const proxyDomain = process.env[REACT_APP_PROXY_LOGIN_DOMAIN];

    // 代理大家采网关域
    const proxyDjcGatewayDomain = process.env[REACT_APP_PROXY_DJC_GATEWAY_DOMAIN];

    const port = process.env.PORT;

    // 代理配置
    const proxyConfig = require(path.resolve(process.cwd(), './project-config/common/proxy'));

    const proxyGroup = get(proxyConfig, `${REACT_APP_PROXY_ENV}.${REACT_APP_PROXY_PLAT}`, []);

    return [
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
        ...proxyGroup,
    ];
};
