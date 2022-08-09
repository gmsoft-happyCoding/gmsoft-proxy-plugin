import get from 'lodash/get';
import path from 'path';
import fs from 'fs-extra';
import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';
import type { Registry } from './type';

// 根据平台信息 构建 client_id
export const buildClientId = (platType?: PlatType, platformCode?: string): string => {
    switch (platType) {
        case PlatType.ZCJ:
            return 'plat@ZCJ';
        case PlatType.XCJ:
            return 'plat@XCJ';
        default:
            return `plat@${platformCode}`;
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

// 根据 环境 和 平台信息 构建  redirect_uri 和 scope
export const buildaPrams = (
    envType: EnvType,
    platType: PlatType,
    envDomain = {},
    platformCode?: string
): {
    client_id?: string;
    scope?: string;
    redirect_uri?: string;
    state?: string;
    registry?: any[];
} => {
    // 获取对应环境 以及 对应平台 的配置
    const domainConfig = get(envDomain, `${envType}.${platType}`);

    // 登录域
    const uri = get(domainConfig, 'loginDomain') || domainConfig;
    if (!uri) {
        return {};
    }

    const clientId = buildClientId(platType, platformCode);

    if (!clientId) {
        return {};
    }

    const common = {
        client_id: clientId,
        scope: uriTransformDomain(uri),
        redirect_uri: `${uri}/gateway/v1/login`,
    };

    const registry: Registry[] = get(domainConfig, 'registry', []);

    return {
        ...common,
        state: JSON.stringify(common),
        registry: registry.map(item => {
            const registryLoginDomain = get(item, 'loginDomain', '');

            const registryLoginUri = uriTransformDomain(registryLoginDomain);

            const buildCommon = {
                client_id: buildClientId(undefined, get(item, 'platformCode')),
                scope: registryLoginUri,
                redirect_uri: `${registryLoginDomain}/gateway/v1/login`,
            };

            return {
                ...buildCommon,
                loginDomain: registryLoginDomain,
                state: JSON.stringify(buildCommon),
            };
        }),
    };
};

export const getNodeModulesPath = (): string => {
    const nodeWorkPath = process.cwd();

    const monoRoot = path.resolve(nodeWorkPath, '..', '..');

    const isMono = fs.pathExistsSync(path.join(monoRoot, 'packages'));

    const root = isMono ? monoRoot : nodeWorkPath;

    const node_modules = path.join(root, 'node_modules');

    return node_modules;
};
