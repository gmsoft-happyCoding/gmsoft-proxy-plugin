import { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { TopRoute } from '../../enums/Route';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const FlexHead = styled.div`
  display: flex;
  padding: 10px 20px;
  margin: 0 -10px;
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 5px 0 10px -5px #999;
`;

const FlexContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
`;

const Main = () => {
  // const navigate = useNavigate();

  // 新增 按钮
  const add = useCallback(() => {
    // navigate(TopRoute.PROJECT_ADD);

    window.electron.startNode('https://www.baidu.com', 3000);
  }, []);

  return (
    <Container>
      <FlexHead>
        <Button icon={<PlusOutlined />} type="primary" onClick={add} />
      </FlexHead>
      <FlexContent>
        <Form layout="vertical" style={{ width: '100%' }}>
          <Form.Item label="环境">
            <Select placeholder="请选择代理环境">
              <Select.Option key="dev">dev</Select.Option>
              <Select.Option key="show">show</Select.Option>
              <Select.Option key="test">test</Select.Option>
              <Select.Option key="test1">test1</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="机房">
            <Select placeholder="请选择登录机房">
              <Select.Option key="zcj">zcj</Select.Option>
              <Select.Option key="xcj">xcj</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="登录域名">
            <Select placeholder="请输入需要登录的域名">
              <Select.Option key="zcj">zcj</Select.Option>
              <Select.Option key="xcj">xcj</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </FlexContent>
    </Container>
  );
};

export default Main;
