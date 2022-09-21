/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import { get, omit } from 'lodash';
import { notification } from 'antd';
import guid from './guid';
import { devLoginApi } from '../api';

interface Registry {
  client_id: string;
  scope: string;
  redirect_uri: string;
  loginDomain: string;
  state: string;
}

const registryOtherDomain = async (registry: Registry[]) => {
  for (let i = 0; i < registry.length; i += 1) {
    const params = get(registry, `${i}`, {});

    const state = JSON.parse(get(registry, `${i}.state`, '{}'));

    const loginDomain = get(registry, `${i}.loginDomain`);

    try {
      await devLoginApi.djc_gateway_authing_oauth_authorize_get({
        params: {
          tenantId: 'gmsoft-web',
          response_type: 'code',
          ...omit(params, ['loginDomain']),
          state: JSON.stringify({ sessionId: guid(), ...state }),
          _proxy_domain_: loginDomain,
        },
      });
    } catch (error) {
      notification.error({
        message: '请求错误',
        description: `${loginDomain}登陆失败，请自行查看response信息`,
      });
    }
  }
};

export { registryOtherDomain };
