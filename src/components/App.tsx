import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Api from '../api';
import Store from '../store';
import Panel from './Panel/Panel.container';
import Details from './Details/Details';
import Layout from './Layout';

const App: React.FC = () => {
  const store = new Store(new Api());
  return (
    <Provider store={store}>
      <Layout toggleUnits={store.toggleUnits}>
        <BrowserRouter>
          <Route path="/" exact component={Panel} />
          <Route path="/details" component={Details} />
        </BrowserRouter>
      </Layout>
    </Provider>
  );
};

export default App;
