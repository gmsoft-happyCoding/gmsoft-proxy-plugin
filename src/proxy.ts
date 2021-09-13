import { REACT_APP_PROXY_LOGIN_DOMAIN } from './constant';

export const proxtConfig = () => {
    // 代理登录域
    const proxyDomain = process.env[REACT_APP_PROXY_LOGIN_DOMAIN];

    const port = process.env.PORT;

    return [
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
            path: '/authing/oauth/authorize',
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
            path: '/gateway/v1/login',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
            },
        },
    ];
};
