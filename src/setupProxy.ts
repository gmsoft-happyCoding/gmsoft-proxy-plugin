import { proxtConfig } from './proxy';

const setupProxy = app => {
    const nodeWorkPath = process.cwd();

    const proxy = require(`${nodeWorkPath}/node_modules/http-proxy-middleware`);

    const config = proxtConfig();

    config.forEach(item => {
        app.use(
            item.path,
            proxy({
                ...item.proxyConfig,
            })
        );
    });
};

export { setupProxy };
