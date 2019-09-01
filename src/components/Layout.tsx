import { Layout as AntdLayout, Switch, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Header, Content, Sider, Footer } = AntdLayout;

interface LayoutProps {
  toggleUnits: () => void;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <AntdLayout>
      <Header>
        <Typography.Title style={{ color: '#fff', margin: '10px 0 0 40px' }} level={3}>
          <Link to="/">Weather App</Link>
          <Switch
            checkedChildren="°C"
            unCheckedChildren="°F"
            defaultChecked
            style={{ marginLeft: 20 }}
            onChange={props.toggleUnits}
          />
        </Typography.Title>
      </Header>
      <AntdLayout>
        <Sider theme="light" />
        <Content>{props.children}</Content>
        <Sider theme="light" />
      </AntdLayout>
      <Footer>Created by, hitman®, 2019</Footer>
    </AntdLayout>
  );
};

export default Layout;
