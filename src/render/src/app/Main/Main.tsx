import React, { useCallback, useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Button, Card, List } from "antd";
import {
  PlusOutlined,
  PoweroffOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LayoutDrawer from "./Drawer";
import { TopRoute } from "../../enums/Route";
import { useHandle } from "./hooks";

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
  padding: 10px 0;
`;

const Main = () => {
  const navigate = useNavigate();

  // 新增 按钮
  // const add = useCallback(() => {
  //   // navigate(TopRoute.PROJECT_ADD);

  //   window.electron.startNode();
  // }, []);

  const { drawerVisible, drawerOpen, drawerClose } = useHandle();

  const servers = useMemo(() => window?.electron?.servers, []);

  const [serverList, setServerList] = useState<any[]>(servers || []);

  useEffect(() => {
    window?.electron?.onUpdateConfig((event, config) => {
      console.log("传递json");
      setServerList(config);
      console.log(config);
    });

    // window.electron.renderReady();

    console.log("渲染了");

    return () => {
      console.log("卸载了");
    };
  }, []);

  return (
    <Container>
      <FlexHead>
        <Button icon={<PlusOutlined />} type="primary" onClick={drawerOpen} />
      </FlexHead>
      <FlexContent>
        <List
          dataSource={serverList}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.label}
                extra={
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onClick={() => {}}
                  />
                }
              >
                {item.proxyDomain}
              </Card>
            </List.Item>
          )}
        />
      </FlexContent>
      <LayoutDrawer open={drawerVisible} onClose={drawerClose} />
    </Container>
  );
};

export default Main;
