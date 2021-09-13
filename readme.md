## 安装

```bash
$ npm install --save-dev http-proxy-middleware
```

Note:切换成私服 npm 源

## 使用

## 修改文件

      */project-config/default.js

      加入对插件的使用

```javascript
const { chooseProxyOptions } = require('gmsoft-proxy-plugin');

module.exports = {
    envs: {
        // 网关服务器base路径
        REACT_APP_API_GATEWAY_BASE: 'http://easy-mock.gm/mock/5c514bf9cd2f550e9dfbb515/',

        /** ...... **/
    },
    plugins: [chooseProxyOptions],
};
```

     ./config/webpackDevServer.config.js

```javascript
const { setupProxy } = require('gmsoft-proxy-plugin');

before(app, server) {

      app.use(evalSourceMapMiddleware(server));

      app.use(errorOverlayMiddleware());

      setupProxy(app);  // 插入 插件 代理配置

      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(app);
      }
    },
```

    ./src/App.ts

```javascript
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { useRestore } from 'gm-react-hanger';
import Loading from '@/components/Loading';
import { GmsoftCloudComponent } from '@/components/CloudComponent'; // 关键
import { stateContainer } from './utils';

const App = () => {
    useRestore(stateContainer._history);

    return (
        <Provider store={stateContainer._store}>
            <React.Suspense fallback={<Loading />}>
                <Router history={stateContainer._history}>
                    <Switch>
                        {process.env.NODE_ENV === 'development' && (
                            <Route
                                path="/"
                                exact
                                render={() => (
                                    <GmsoftCloudComponent
                                        componentName="DevLogin"
                                        loginParams={process.env.REACT_APP_PROXY_PARAMS}
                                    />
                                )}
                            />
                        )}
                        <Route path="/" component={React.lazy(() => import('./app/Home'))} />
                    </Switch>
                </Router>
            </React.Suspense>
        </Provider>
    );
};
export default App;
```
