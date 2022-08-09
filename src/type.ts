export interface Registry {
    loginDomain: string;
    platformCode: string;
}

export interface DomainConfig {
    loginDomain: string;
    platformCode: string;
    registry?: Registry[];
}

export interface EnvDomain {
    [key: string]: DomainConfig;
}

export interface ProxyConfig {
    envDomain?: EnvDomain;
}
