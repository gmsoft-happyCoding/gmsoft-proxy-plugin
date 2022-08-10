import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';

/** 环境对应域名 */
export const ENV_DOMAIN = {
    [EnvType.DEV]: {
        [PlatType.ZCJ]: {
            loginDomain: 'https://www.cqzcjdev1.gm',
            platformCode: 'ZCJ',
        },
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djcdev1.gm',
            loginDomain: 'https://www.xcjdev1.gm',
            platformCode: 'XCJ',
        },
    },
    [EnvType.SHOW]: {
        [PlatType.ZCJ]: {
            loginDomain: 'https://www.gpwbeta.com',
            platformCode: 'ZCJ',
        },
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djcshow.gm',
            loginDomain: 'https://www.cqzcjshow.com',
            platformCode: 'XCJ',
        },
    },
    [EnvType.TEST1]: {
        [PlatType.ZCJ]: {
            loginDomain: 'https://www.cqzcjtest1.gm',
            platformCode: 'ZCJ',
        },
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djctest1.gm',
            loginDomain: 'https://www.xcjtest1.gm',
            platformCode: 'XCJ',
        },
    },
};

// 登录代理参数
export const REACT_APP_PROXY_PARAMS = 'REACT_APP_PROXY_PARAMS';

// 代理平台
export const REACT_APP_PROXY_PLAT = 'REACT_APP_PROXY_PLAT';

// 代理环境
export const REACT_APP_PROXY_ENV = 'REACT_APP_PROXY_ENV';

// 代理大家采域名
export const REACT_APP_PROXY_DJC_GATEWAY_DOMAIN = 'REACT_APP_PROXY_DJC_GATEWAY_DOMAIN';

// 登录所在域
export const REACT_APP_PROXY_LOGIN_DOMAIN = 'REACT_APP_PROXY_LOGIN_DOMAIN';

// 登录 所在域 不带协议
export const REACT_APP_PROXY_LOGIN_DOMAIN_NOT_PROTOCOL =
    'REACT_APP_PROXY_LOGIN_DOMAIN_NOT_PROTOCOL';
