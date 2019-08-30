import { Layout } from 'antd';
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
        <Header style={{ color: '#fff', fontWeight: 'bold' }}>Weather App</Header>
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
