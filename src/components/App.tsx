import { Layout } from "antd";
import { Provider } from "mobx-react";
import React from "react";
import Api from "../api";
import Store from "../store";
import Weather from "./TownWeather/Weather.container";
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const store = new Store(new Api());
  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <Header>Weather App</Header>
          <Content>
            <Weather town={"Kiev"} />
            <Weather town={"Kharkiv"} />
          </Content>
          <Footer>Created by, hitman®, 2019</Footer>
        </Layout>
      </div>
    </Provider>
  );
};

export default App;
