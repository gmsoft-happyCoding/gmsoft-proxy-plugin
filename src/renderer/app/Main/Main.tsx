import { useCallback } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TopRoute } from '../../enums/Route';

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
`;

const Main = () => {
  const navigate = useNavigate();

  // 新增 按钮
  const add = useCallback(() => {
    // navigate(TopRoute.PROJECT_ADD);

    window.electron.startNode();
  }, []);

  return (
    <Container>
      <FlexHead>
        <Button icon={<PlusOutlined />} type="primary" onClick={add} />
      </FlexHead>
      <FlexContent>1111</FlexContent>
    </Container>
  );
};

export default Main;
