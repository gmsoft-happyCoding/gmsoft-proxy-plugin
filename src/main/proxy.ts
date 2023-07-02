import express from "express";
import { Server } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";

interface Args {
  proxyServerPort: number;
  webServerPort: number;
  proxyConfig: any[];
}

const startProxy: (args: Args) => Server = () => {
  const app = express();

  app.use(
    ["/1", "/2", "/3", "/4"],
    createProxyMiddleware({
      target: "https://www.baidu.com",
      changeOrigin: true,
      secure: false,
      ignorePath: true,
    })
  );

  app.use(
    "*",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
    })
  );

  const httpService = app.listen(8000, () => {
    console.log(`服务器启动，开始监听 localhost:3000`);
  });

  return httpService;
};

export default startProxy;
