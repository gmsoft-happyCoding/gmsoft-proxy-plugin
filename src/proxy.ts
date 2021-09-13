import { REACT_APP_PROXT_LOGIN_DOMAIN } from './constant';

export const proxtConfig = () => {
    // 代理登录域
    const proxyDomain = process.env[REACT_APP_PROXT_LOGIN_DOMAIN];

    const port = process.env.PORT;

    return [
        {
            path: '/djc-gateway',
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
            path: '/gateway',
            proxyConfig: {
                target: proxyDomain,
                secure: false,
                changeOrigin: true,
            },
        },
    ];
};
