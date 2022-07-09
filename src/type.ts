export interface DomainConfig {
    djcGatewayDomain: string;
    loginDomain: string;
    platformCode?: string;
}

export interface PlatConfig {
    [key: string]: DomainConfig | string;
}

export interface EnvDomain {
    [key: string]: PlatConfig;
}

export interface ProxyConfig {
    envDomain?: EnvDomain;
}
