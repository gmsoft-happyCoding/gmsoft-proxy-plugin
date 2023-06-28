import React, { useState } from "react";
import { Drawer, Button, Form, Input } from "antd";
import { DrawerProps } from "antd/lib/drawer";

interface Props extends DrawerProps {}

const LayoutDrawer = (props: Props) => {
  const { open, onClose } = props;

  return (
    <Drawer
      title="新增代理服务器"
      placement="right"
      size="large"
      onClose={onClose}
      open={open}
      destroyOnClose
      extra={
        <div>
          <Button onClick={onClose}>关闭</Button>
          <Button type="primary" onClick={onClose} style={{ marginLeft: 10 }}>
            保存
          </Button>
        </div>
      }
    >
      <Form layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="代理名称">
          <Input placeholder="请输入代理名称" />
        </Form.Item>
        <Form.Item label="代理域">
          <Input placeholder="请输入代理域" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default LayoutDrawer;
