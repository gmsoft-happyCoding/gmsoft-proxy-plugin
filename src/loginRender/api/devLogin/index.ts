/* eslint-disable */
import { AxiosRequestConfig } from 'axios';
import { Opts, WithPathOpts } from '../Opts.d';
import instance from './instance';
import { convertRESTAPI } from '../util';

/** token写入接口 */
function djc_gateway_authing_oauth_authorize_get(opts: Opts) {
  return instance({
    method: 'get',
    url:  '/djc-gateway/authing/oauth/authorize',
    opts: opts
  });
}

/** 登录接口 */
function djc_gateway_authing_login_post(opts: Opts) {
  return instance({
    method: 'post',
    url:  '/djc-gateway/authing/login',
    opts: opts
  });
}

/** 登出接口 */
function djc_gateway_authing_logout_delete(opts: Opts) {
  return instance({
    method: 'delete',
    url:  '/djc-gateway/authing/logout',
    opts: opts
  });
}

/** logincomm对当前域进行token写入 */
function logincomm_api_v1_sign_get(opts: Opts) {
  return instance({
    method: 'get',
    url:  '/logincomm/api/v1/sign',
    opts: opts
  });
}

export {
  djc_gateway_authing_oauth_authorize_get,
  djc_gateway_authing_login_post,
  djc_gateway_authing_logout_delete,
  logincomm_api_v1_sign_get
};
