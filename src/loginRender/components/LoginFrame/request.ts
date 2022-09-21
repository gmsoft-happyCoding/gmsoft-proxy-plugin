import { notification } from 'antd';
import { get, omit } from 'lodash';
import md5 from 'js-md5';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { createAPI } from '../../api/util';
import { registryOtherDomain } from '../../utils';
import { devLoginApi } from '../../api';

const domainRegx =
  /(http(s)?:)?\/\/(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?(\.|:))+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

const buildAxiox = (url: string) =>
  createAPI()({
    method: 'get',
    url,
  });

interface LoginResponse {
  location: string;
  ops?: string[];
}

export const loginRequest = async (
  accoutMsg: { account: string; password: string; identities?: string },
  params: object,
  loginSuccessRedirectUri: string,
  mobile?: string
) => {
  const registry = get(params, 'registry', []);

  const loginMainParams = omit(params, ['registry']);

  const { data }: AxiosResponse<LoginResponse> =
    await devLoginApi.djc_gateway_authing_login_post({
      data: qs.stringify({
        tenantId: 'gmsoft-web',
        username: accoutMsg.account,
        password: md5(accoutMsg.password),
        identityId: accoutMsg.identities,
        response_type: 'code',
        ...loginMainParams,
        ...(mobile
          ? {
              mobile,
              code: '111111',
            }
          : {}),
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

  const { location, ops = [] } = data;

  const requestBaseUrl = domainRegx.exec(location || '');

  if (location) {
    try {
      await buildAxiox(
        location.replace(
          requestBaseUrl ? new RegExp(requestBaseUrl[0]) : '',
          ''
        )
      );
      if (loginSuccessRedirectUri) {
        const originDomin = window.location.origin;

        window.location.href = `${originDomin}${loginSuccessRedirectUri}`;
      } else {
        notification.success({
          message: '登录成功',
          description: '登录成功，但因你未指定跳转路径需要您自行跳转!',
        });
      }
    } catch (error) {
      notification.error({
        message: '请求错误',
        description: get(error, 'response.data.error_message', '网络错误'),
      });
    }
  } else {
    try {
      await devLoginApi.djc_gateway_authing_oauth_authorize_get({
        params: {
          tenantId: 'gmsoft-web',
          response_type: 'code',
          ...loginMainParams,
        },
      });

      const promises = ops
        .filter((url) => url)
        .map((url: string) => {
          const urlDomain = domainRegx.exec(url);

          return Axios.get(
            url.replace(urlDomain ? new RegExp(urlDomain[0]) : '', ''),
            {
              params: {
                _proxy_domain_: urlDomain ? urlDomain[0] : '',
              },
            }
          );
        });

      await Axios.all([...promises]);

      registryOtherDomain(registry);

      if (loginSuccessRedirectUri) {
        const originDomin = window.location.origin;

        window.location.href = `${originDomin}${loginSuccessRedirectUri}`;
      } else {
        notification.success({
          message: '登录成功',
          description: '登录成功，但因你未指定跳转路径需要您自行跳转!',
        });
      }
    } catch (error) {
      notification.error({
        message: '请求错误',
        description: get(error, 'response.data.error_message', '网络错误'),
      });
    }
  }
};
