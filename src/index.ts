import get from 'lodash/get';
import merge from 'lodash/merge';
import map from 'lodash/map';
import {
    ENV_DOMAIN,
    REACT_APP_PROXY_PARAMS,
    REACT_APP_PROXY_PLAT,
    REACT_APP_PROXY_ENV,
    REACT_APP_PROXY_LOGIN_DOMAIN,
} from './constant';
import { buildaPrams } from './utils';
import { proxtConfig } from './proxy';
import { setupProxy } from './setupProxy';
import { LoginType } from './enums/LoginType.enum';
import { EnvType } from './enums/EnvType.enum';
import { PlatType } from './enums/PlatType.enum';

const proxyOptions =
    (envDomain = {}, loginType?: boolean) =>
    async (context: any) => {
        const { inquirer, produce, pluginOption } = context;

        const isDev = process.env.NODE_ENV !== 'production';

        const mergeEnvDomain = merge(ENV_DOMAIN, envDomain);

        const questions = [
            ...(loginType
                ? [
                      {
                          type: 'list',
                          name: 'loginType',
                          message: '请选择登录模式:',
                          choices: [
                              { name: '新的(当前test1环境登录)', value: LoginType.NEW },
                              { name: '旧的(当前show环境登录)', value: LoginType.OLD },
                          ],
                          default: LoginType.NEW,
                      },
                  ]
                : []),
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
                default: PlatType.GLXT,
            },
        ];

        if (isDev) {
            const answers = await inquirer
                .prompt(questions)
                .then(_answers => ({ ...pluginOption, ..._answers }));
            return produce(context, draft => {
                draft.config.envs = {
                    ...draft.config.envs,
                    /** 代理环境 */
                    [REACT_APP_PROXY_ENV]: answers.proxyEnv,
                    /** 代理平台 */
                    [REACT_APP_PROXY_PLAT]: answers.proxyPlat,
                    /** 代理请求所需参数 */
                    [REACT_APP_PROXY_PARAMS]: buildaPrams(
                        answers.proxyEnv,
                        answers.proxyPlat,
                        mergeEnvDomain,
                        answers.loginType
                    ),
                    /** 代理域名 */
                    [REACT_APP_PROXY_LOGIN_DOMAIN]: get(
                        mergeEnvDomain,
                        `${answers.proxyEnv}.${answers.proxyPlat}`
                    ),
                };
            });
        }
        return context;
    };

const chooseLoginTypeProxyOptions = proxyOptions(true);

const chooseProxyOptions = proxyOptions(false);

const customProxyOptions = proxyOptions;

export default proxyOptions;

export {
    proxtConfig,
    customProxyOptions,
    chooseProxyOptions,
    chooseLoginTypeProxyOptions,
    setupProxy,
};
