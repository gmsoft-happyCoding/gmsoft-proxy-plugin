import { AxiosRequestConfig } from 'axios';

interface PathParam {
  path: { [key: string]: string };
}

export type Opts = AxiosRequestConfig;

export type WithPathOpts = Opts & PathParam;
