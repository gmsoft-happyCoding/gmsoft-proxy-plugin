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
                REACT_APP_PROXY_ENV: answers.proxyEnv,
                REACT_APP_PROXY_PLAT: answers.proxyPlat,
            };
        });
    }
    return context;
};

module.exports = chooseProxyOptions;
