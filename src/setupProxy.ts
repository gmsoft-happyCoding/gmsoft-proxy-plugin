import { proxtConfig } from './proxy';
import { getNodeModulesPath } from './utils';

const setupProxy = (app: any): void => {
    const node_modules = getNodeModulesPath();

    const proxy = require(`${node_modules}\\http-proxy-middleware`);

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
