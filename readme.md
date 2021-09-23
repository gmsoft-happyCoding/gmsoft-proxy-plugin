## 安装

```bash
$ npm install -dev @gmsoft/proxy-plugin

$ yarn add @gmsoft/proxy-plugin --dev
```

Note:切换成私服 npm 源

## 使用

## 修改文件

      */project-config/default.js

      加入对插件的使用

```javascript
/**
 * @chooseProxyOptions 方法只针对 当前最新版本登录方案
 * @chooseLoginTypeProxyOptions  可选择登录方案(新的 或者 旧的)
 * @customProxyOptions  自定义 环境配置 以及 环境对应域  @params 可选
 * */

/**
 * @params {envDomain:Object,loginType:boolean}
 */

/**
 * @envDomain
 */

/** 已环境枚举为 key 构建 平台枚举为key的配置 */
enum EnvType {
    /** dev */
    DEV = 'dev',

    /** show */
    SHOW = 'show',

    /** test1 */
    TEST1 = 'test1',
}

/** 已平台枚举为key的配置 */
enum PlatType {
    /** GLXT */
    GLXT = 'GLXT',

    /** ZCJ */
    ZCJ = 'ZCJ',

    /** XCJ */
    XCJ = 'XCJ',
}


/** 此为默认对应环境以及环境中平台的配置信息 */
/**
 * @Config string | {djcGatewayDomain:string,loginDomain:string,platformCode?:string}
 */
const ENV_DOMAIN = {
    [EnvType.DEV]: {
        [PlatType.GLXT]: 'http://192.168.2.21:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjdev1.gm',
        [PlatType.XCJ]: 'https://www.xcjdev1.gm',
    },
    [EnvType.SHOW]: {
        [PlatType.GLXT]: 'http://192.168.2.20:31880',
        [PlatType.ZCJ]: 'https://www.gpwbeta.com',
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djcshow.gm',
            loginDomain: 'https://www.cqzcjshow.com',
        },
    },
    [EnvType.TEST1]: {
        [PlatType.GLXT]: 'http://192.168.2.22:31880',
        [PlatType.ZCJ]: 'https://www.cqzcjtest1.gm',
        [PlatType.XCJ]: {
            djcGatewayDomain: 'https://www.djc360.com',
            loginDomain: 'https://www.xcj360.com',
        },
    },
};


/**
 * @loginType boolean;// 是否可选择登录方案   默认：false
 * */


const {
    chooseProxyOptions,
    chooseLoginTypeProxyOptions,
    customProxyOptions,
} = require('@gmsoft/proxy-plugin');

module.exports = {
    envs: {
        // 网关服务器base路径
        REACT_APP_API_GATEWAY_BASE: 'http://easy-mock.gm/mock/5c514bf9cd2f550e9dfbb515/',

        /** ...... **/
    },
    /** 重要语句 开始 */
    /** 方案1 */
    plugins: [chooseProxyOptions], // 无自定义环境代理 新登录方案

    /** 方案2 */
    plugins: [chooseLoginTypeProxyOptions], // 无自定义环境代理 旧登录方案

    /** 方案3 */
    // 无自定义环境代理 登录方案
    plugins: [customProxyOptions({envDomain: {show: {
          cqsgaj: {
            djcGatewayDomain: 'https://www.djcshow.gm',  // djc-gateway网关部署域名
            loginDomain: 'https://cqsgaj.cqzcjshow.com', // 需要登录的域
            platformCode: 'cqsgaj.cqzcjshow.com',  // 私有域 配置的 平台 code 用于 登录请求
          },
         }
        },loginType:true })],

    /** 重要语句 结束 */
};
```

     ./config/webpackDevServer.config.js

```javascript
const { setupProxy } = require('@gmsoft/proxy-plugin');

before(app, server) {

      app.use(evalSourceMapMiddleware(server));

      app.use(errorOverlayMiddleware());

      /* 重要插入语句 开始 */
      setupProxy(app);  // 插入 插件 代理配置
      /* 重要插入语句 结束 */

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
                        {/* 重要语句 开始 */}
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
                        {/* 重要语句 结束 */}
                        <Route path="/" component={React.lazy(() => import('./app/Home'))} />
                    </Switch>
                </Router>
            </React.Suspense>
        </Provider>
    );
};
export default App;
```
