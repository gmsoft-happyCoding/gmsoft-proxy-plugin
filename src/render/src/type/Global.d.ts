interface Window {
  electron: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    startProxyService: () => void;
    onUpdateConfig: (callback: any) => void;
    servers: any[];
    changeServerStatus: (status: boolean) => void;
    renderReady: () => void;
  };
}

interface RouteInterface {
  path: string;
  name: string;
  element: React.LazyExoticComponent<any>;
}
