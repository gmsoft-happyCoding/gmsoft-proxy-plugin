import get from 'lodash/get';
import {
    ENV_DOMAIN,
    REACT_APP_PROXY_PARAMS,
    REACT_APP_PROXY_PLAT,
    REACT_APP_PROXY_ENV,
    REACT_APP_PROXT_LOGIN_DOMAIN,
} from './constant';
import { buildaPrams } from './utils';
import { proxtConfig } from './proxy';
import { setupProxy } from './setupProxy';

const chooseProxyOptions = async (context: any) => {
    const { inquirer, produce, pluginOption } = context;

    const isDev = process.env.NODE_ENV !== 'production';

    const questions = [
        {
            type: 'list',
            name: 'proxyEnv',
            message: '请选择代理环境:',
            choices: [
                { name: 'dev', value: 'dev' },
                { name: 'show', value: 'show' },
                { name: 'test1', value: 'test1' },
            ],
            default: 'dev',
        },
        {
            type: 'list',
            name: 'proxyPlat',
            message: '请选择代理平台:',
            choices: [
                { name: 'GLXT', value: 'GLXT' },
                { name: 'ZCJ', value: 'ZCJ' },
                { name: 'XCJ', value: 'XCJ' },
            ],
            default: 'GLXT',
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
                [REACT_APP_PROXY_PARAMS]: buildaPrams(answers.proxyEnv, answers.proxyPlat),
                /** 代理域名 */
                [REACT_APP_PROXT_LOGIN_DOMAIN]: get(
                    ENV_DOMAIN,
                    `${answers.proxyEnv}.${answers.proxyPlat}`
                ),
            };
        });
    }
    return context;
};

export default chooseProxyOptions;
export { proxtConfig, chooseProxyOptions, setupProxy };
