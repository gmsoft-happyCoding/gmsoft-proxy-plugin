import get from 'lodash/get';
import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';
import { LoginType } from './enums/LoginType.enum';

// 根据平台信息 构建 client_id
export const buildClientId = (platType: PlatType): string => {
    switch (platType) {
        case PlatType.GLXT:
            return 'ZCJ@PM';
        case PlatType.ZCJ:
            return 'plat@ZCJ';
        case PlatType.XCJ:
        default:
            return 'plat@XCJ';
    }
};

// 将uri地址转换为域名
const uriTransformDomain = (uri: string) => {
    const repalceGrpup = /(http(s)?:)\/\//.exec(uri);

    if (repalceGrpup) {
        return uri.replace(repalceGrpup ? new RegExp(repalceGrpup[0]) : '', '');
    }

    return uri;
};

// 老登录方式的 scope 转换
const platScopeBuild = (platType: PlatType) => {
    switch (platType) {
        case PlatType.ZCJ:
        case PlatType.GLXT:
            return PlatType.ZCJ;
        case PlatType.XCJ:
        default:
            return PlatType.XCJ;
    }
};

// 根据 环境 和 平台信息 构建  redirect_uri 和 scope
export const buildaPrams = (
    envType: EnvType,
    platType: PlatType,
    envDomain = {},
    loginType?: LoginType
): {
    client_id?: string;
    scope?: string;
    redirect_uri?: string;
    state?: string;
} => {
    // 获取对应环境 以及 对应平台 的配置
    const domainConfig = get(envDomain, `${envType}.${platType}`);

    // 登录域
    const uri = get(domainConfig, 'loginDomain') || domainConfig;
    if (!uri) {
        return {};
    }

    const clientId = buildClientId(platType);

    if (!clientId) {
        return {};
    }

    const common = {
        client_id: clientId,
        scope: loginType === LoginType.OLD ? platScopeBuild(platType) : uriTransformDomain(uri),
        redirect_uri: `${uri}/gateway/v1/login`,
    };

    return {
        ...common,
        state: JSON.stringify(common),
    };
};
