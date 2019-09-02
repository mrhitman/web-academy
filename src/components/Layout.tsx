import { Layout as AntdLayout, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import UnitSwitcher from "./UnitSwitcher/UnitSwitcher.container";

const { Header, Content, Sider, Footer } = AntdLayout;

const Layout: React.FC = props => {
  return (
    <AntdLayout>
      <Header>
        <Typography.Title
          style={{ color: "#fff", margin: "10px 0 0 40px" }}
          level={3}
        >
          <Link to="/">Weather App</Link>
          <UnitSwitcher />
        </Typography.Title>
      </Header>
      <AntdLayout style={{ paddingTop: 10 }}>
        <Sider theme="light" width={60} />
        <Content>{props.children}</Content>
        <Sider theme="light" width={60} />
      </AntdLayout>
      <Footer>Created by, hitman®, 2019</Footer>
    </AntdLayout>
  );
};

export default Layout;
