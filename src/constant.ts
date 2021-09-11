import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';

/** 环境对应域名 */
export const ENV_DOMAIN = {
    [EnvType.dev]: {
        [PlatType.GLXT]: 'http://192.168.2.21:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjdev1.gm',
        [PlatType.XCJ]: 'https://www.xcjdev1.gm',
    },
    [EnvType.show]: {
        [PlatType.GLXT]: 'http://192.168.2.20:31880',
        [PlatType.ZCJ]: 'https://www.gpwbeta.com',
        [PlatType.XCJ]: 'https://www.cqzcjshow.com',
    },
    [EnvType.test1]: {
        [PlatType.GLXT]: 'http://192.168.2.22:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjtest1.gm',
        [PlatType.XCJ]: 'https://www.xcjtest1.gm',
    },
};
