import path from 'path';
import fs from 'fs-extra';
import { proxtConfig } from './proxy';

const setupProxy = (app: any) => {
    const monoRoot = path.resolve(process.cwd(), '..', '..');

    const isMono = fs.pathExistsSync(path.join(monoRoot, 'packages'));

    const root = isMono ? monoRoot : process.cwd();

    const node_modules = path.join(root, 'node_modules');

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
