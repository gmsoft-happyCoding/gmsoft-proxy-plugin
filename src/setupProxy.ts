import proxy from 'http-proxy-middleware';
import { proxtConfig } from './proxy';

const config = proxtConfig();

const setupProxy = app => {
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
