import { Layout, Switch, Typography } from 'antd';
import { Provider } from 'mobx-react';
import React from 'react';
import Api from '../api';
import Store from '../store';
import Panel from './Panel/Panel.container';
const { Header, Content, Sider, Footer } = Layout;

const App: React.FC = () => {
  const store = new Store(new Api());
  return (
    <Provider store={store}>
      <Layout>
        <Header>
          <Typography.Title style={{ color: '#fff', margin: '10px 0 0 40px' }} level={3}>
            Weather App
            <Switch
              checkedChildren="°C"
              unCheckedChildren="°F"
              defaultChecked
              style={{ marginLeft: 20 }}
              onChange={store.toggleUnits}
            />
          </Typography.Title>
        </Header>
        <Layout>
          <Sider theme="light" />
          <Content>
            <Panel />
          </Content>
          <Sider theme="light" />
        </Layout>
        <Footer>Created by, hitman®, 2019</Footer>
      </Layout>
    </Provider>
  );
};

export default App;
