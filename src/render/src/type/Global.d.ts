interface Window {
  electron: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    startProxyService: () => void;
  };
}

interface RouteInterface {
  path: string;
  name: string;
  element: React.LazyExoticComponent<any>;
}
