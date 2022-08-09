import get from 'lodash/get';
import merge from 'lodash/merge';
import map from 'lodash/map';
import {
    ENV_DOMAIN,
    REACT_APP_PROXY_PARAMS,
    REACT_APP_PROXY_PLAT,
    REACT_APP_PROXY_ENV,
    REACT_APP_PROXY_LOGIN_DOMAIN,
    REACT_APP_PROXY_LOGIN_DOMAIN_NOT_PROTOCOL,
} from './constant';
import { buildaPrams } from './utils';
import { proxtConfig } from './proxy';
import { setupProxy } from './setupProxy';
import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';
import type { ProxyConfig } from './type';

const proxyOptions: (proxyConfig?: ProxyConfig) => (context: any) => Promise<any> =
    (proxyConfig = { envDomain: {} }) =>
    async (context: any) => {
        const { envDomain } = proxyConfig;

        const { inquirer, produce, pluginOption } = context;

        const isDev = process.env.NODE_ENV !== 'production';

        const mergeEnvDomain = merge(ENV_DOMAIN, envDomain);

        const questions = [
            {
                type: 'list',
                name: 'proxyEnv',
                message: '请选择代理环境:',
                choices: map(mergeEnvDomain, (_, key) => ({ name: key, value: key })),
                default: EnvType.DEV,
            },
            {
                type: 'list',
                name: 'proxyPlat',
                message: '请选择代理平台:',
                choices: answers => {
                    const proxyEnv = answers.proxyEnv;
                    return map(mergeEnvDomain[proxyEnv], (_, key) => ({ name: key, value: key }));
                },
                default: PlatType.ZCJ,
            },
        ];

        if (isDev) {
            const answers = await inquirer
                .prompt(questions)
                .then(_answers => ({ ...pluginOption, ..._answers }));
            return produce(context, draft => {
                const { proxyEnv, proxyPlat } = answers;

                // 获取 代理登录
                const domainConfig = get(mergeEnvDomain, `${proxyEnv}.${proxyPlat}`);

                // 获取代理平台的平台编码
                const platformCode = get(domainConfig, 'platformCode');

                draft.config.envs = {
                    ...draft.config.envs,
                    /** 代理环境 */
                    [REACT_APP_PROXY_ENV]: proxyEnv,
                    /** 代理平台 */
                    [REACT_APP_PROXY_PLAT]: proxyPlat,
                    /** 代理请求所需参数 */
                    [REACT_APP_PROXY_PARAMS]: buildaPrams(
                        proxyEnv,
                        proxyPlat,
                        mergeEnvDomain,
                        platformCode as string
                    ),
                    /** 代理登录域名  带协议 */
                    [REACT_APP_PROXY_LOGIN_DOMAIN]:
                        get(domainConfig, 'loginDomain') || domainConfig,
                    /** 代理登录域名 不带协议 */
                    [REACT_APP_PROXY_LOGIN_DOMAIN_NOT_PROTOCOL]: (
                        (get(domainConfig, 'loginDomain') || domainConfig) as string
                    ).replace(/^(http:|https:)(\/)*/, ''),
                };
            });
        }
        return context;
    };

const chooseProxyOptions = proxyOptions();

const customProxyOptions = proxyOptions;

export default proxyOptions;

export { proxtConfig, customProxyOptions, chooseProxyOptions, setupProxy };
