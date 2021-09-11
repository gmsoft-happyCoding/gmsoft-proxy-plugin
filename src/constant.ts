const envType = require('./enums/EnvType.enum');

const PlatType = require('./enums/PlatType.enum');

/** 环境对应域名 */
const ENV_DOMAIN = {
    [envType.dev]: {
        [PlatType.GLXT]: 'http://192.168.21.20:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjdev1.gm',
        [PlatType.XCJ]: 'https://www.xcjdev1.gm',
    },
    [envType.show]: {
        [PlatType.GLXT]: 'http://192.168.20.20:31880',
        [PlatType.ZCJ]: 'https://www.gpwbeta.com',
        [PlatType.XCJ]: 'https://www.cqzcjshow.com',
    },
    [envType.test1]: {
        [PlatType.GLXT]: 'http://192.168.22.20:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjtest1.gm',
        [PlatType.XCJ]: 'https://www.xcjtest1.gm',
    },
};
