interface Window {
  electron: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    ipcRenderer: {
      sendMessage(channel: Channels, args: unknown[]): void;
      on(
        channel: string,
        func: (...args: unknown[]) => void
      ): (() => void) | undefined;
      once(channel: string, func: (...args: unknown[]) => void): void;
    };
  };
}

interface RouteInterface {
  path: string;
  name: string;
  element: React.LazyExoticComponent<any>;
}
