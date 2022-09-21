import { useCallback, useState, useContext } from 'react';
import { get } from 'lodash';
import { Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Mode } from '../../enums/Mode.enum';
import {
  Wraper,
  HeadTitle,
  ErrorTitle,
  PackInput,
  OtherFormItem,
  PackButton,
  PackResetButton,
  PackAlert,
} from './styled';
import Context from '../../Context';
import { loginRequest } from './request';

export interface FormValue {
  account: string;
  password: string;
}

const LoginFrame = () => {
  const {
    buildLoginParams = {},
    loginSuccessRedirectUri = '',
    setMode,
    setIdentities,
    loginParamsRef,
  } = useContext(Context);

  const [form] = Form.useForm();

  // 错误信息文字
  const [errorText, setErrorText] = useState('');

  // loading
  const [loading, setLoding] = useState(false);

  // 登录接口
  const login = useCallback(
    async (values: FormValue) => {
      setLoding(true);

      try {
        await loginRequest(values, buildLoginParams, loginSuccessRedirectUri);

        setLoding(false);
      } catch (error) {
        const resCode = get(error, 'response.data.res');

        setLoding(false);

        if (resCode === 2) {
          if (setMode) {
            setMode(Mode.IDENTITIES);
            if (setIdentities) {
              setIdentities(get(error, 'response.data.identities', []));
            }
          }
        } else if (
          get(error, 'response.data.code') === 1101 ||
          get(error, 'response.data.res') === 1101
        ) {
          const requestMobile = get(error, 'response.data.additional.mobile');

          await loginRequest(
            values,
            buildLoginParams,
            loginSuccessRedirectUri,
            requestMobile
          );
        } else {
          const text = get(error, 'message', '服务器错误，请稍候在试！');

          setErrorText(text);
        }
      }
    },
    [buildLoginParams, loginSuccessRedirectUri, setMode, setIdentities]
  );

  // 点击 form 提交按钮回调
  const handleSubmit = useCallback(
    (values: FormValue) => {
      if (loginParamsRef) {
        loginParamsRef.current = {
          account: get(values, 'account'),
          password: get(values, 'password'),
        };
      }

      login(values);
    },
    [login, loginParamsRef]
  );

  // 重置按钮
  const resetButtonHandle = useCallback(() => {
    form.resetFields();
  }, [form]);

  // 任意输入框值变化事件
  const inputChange = useCallback(() => {
    if (errorText) {
      setErrorText('');
    }
  }, [errorText, setErrorText]);

  return (
    <Wraper>
      <HeadTitle>
        欢迎登录
        {errorText && (
          <ErrorTitle>
            <PackAlert message={errorText} type="error" showIcon />
          </ErrorTitle>
        )}
      </HeadTitle>
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <PackInput
            prefix={<UserOutlined />}
            placeholder="请输入用户名"
            allowClear
            onChange={inputChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <PackInput
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入密码"
            allowClear
            onChange={inputChange}
          />
        </Form.Item>
        <OtherFormItem>
          <PackResetButton
            type="link"
            size="small"
            onClick={resetButtonHandle}
            disabled={loading}
          >
            重&nbsp;&nbsp;置
          </PackResetButton>
        </OtherFormItem>
        <Form.Item>
          <PackButton type="primary" htmlType="submit" block loading={loading}>
            登录
          </PackButton>
        </Form.Item>
      </Form>
    </Wraper>
  );
};

export default LoginFrame;
