import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Api from '../api';
import Store from '../store';
import Panel from './Panel/Panel.container';
import Details from './Details/Details.container';
import Layout from './Layout';
import NotFound from './NotFound';

const App: React.FC = () => {
  const store = new Store(new Api());
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout toggleUnits={store.toggleUnits}>
          <Switch>
            <Route path="/" exact component={Panel} />
            <Route path="/details/:townId" component={Details} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
