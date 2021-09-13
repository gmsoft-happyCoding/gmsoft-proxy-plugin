import get from 'lodash/get';
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

const proxyOptions = (loginType: boolean) => async (context: any) => {
    const { inquirer, produce, pluginOption } = context;

    const isDev = process.env.NODE_ENV !== 'production';

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
            choices: [
                { name: 'dev', value: EnvType.DEV },
                { name: 'show', value: EnvType.SHOW },
                { name: 'test1', value: EnvType.TEST1 },
            ],
            default: EnvType.DEV,
        },
        {
            type: 'list',
            name: 'proxyPlat',
            message: '请选择代理平台:',
            choices: [
                { name: 'GLXT', value: PlatType.GLXT },
                { name: 'ZCJ', value: PlatType.ZCJ },
                { name: 'XCJ', value: PlatType.XCJ },
            ],
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
                    answers.loginType
                ),
                /** 代理域名 */
                [REACT_APP_PROXY_LOGIN_DOMAIN]: get(
                    ENV_DOMAIN,
                    `${answers.proxyEnv}.${answers.proxyPlat}`
                ),
            };
        });
    }
    return context;
};

const chooseLoginTypeProxyOptions = proxyOptions(true);

const chooseProxyOptions = proxyOptions(false);

export default proxyOptions;

export { proxtConfig, chooseProxyOptions, chooseLoginTypeProxyOptions, setupProxy };
