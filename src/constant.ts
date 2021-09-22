import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';

/** 环境对应域名 */
export const ENV_DOMAIN = {
    [EnvType.DEV]: {
        [PlatType.GLXT]: 'http://192.168.2.21:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjdev1.gm',
        [PlatType.XCJ]: 'https://www.xcjdev1.gm',
    },
    [EnvType.SHOW]: {
        [PlatType.GLXT]: 'http://192.168.2.20:31880',
        [PlatType.ZCJ]: 'https://www.gpwbeta.com',
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djcshow.gm',
            loginDomain: 'https://www.cqzcjshow.com',
        },
    },
    [EnvType.TEST1]: {
        [PlatType.GLXT]: 'http://192.168.2.22:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjtest1.gm',
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djc360.com',
            loginDomain: 'https://www.xcj360.com',
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
