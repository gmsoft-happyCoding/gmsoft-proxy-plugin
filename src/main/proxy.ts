import httpProxy from "http-proxy";

const startProxy = () => {
  console.log("111111");

  const service = httpProxy
    .createProxyServer({
      // forward: "/ws",
      target: "https://www.baidu.com",
      changeOrigin: true,
      secure: false,
    })
    .listen(3000);

  service.on("open", () => {
    console.log("代理服务器开启");
  });

  service.on("close", () => {
    console.log("代理服务器关闭");
  });

  //  console.log(service);

  return service;
};

export default startProxy;
