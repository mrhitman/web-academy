import { Col, Row } from "antd";
import React, { Fragment } from "react";
import Store from "../../store";
import Search from "../Search/Search.container";
import Weather from "../TownWeather/Weather.container";

interface PanelProps {
  store: Store;
}

const Panel: React.FC<PanelProps> = props => {
  return (
    <Fragment>
      <Row>
        <Col offset={18} span={6}>
          <Search />
        </Col>
      </Row>
      <Row gutter={12}>
        {props.store.towns.map(id => (
          <Col key={id} lg={6} md={8} sm={12} xs={24}>
            <Weather id={id} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default Panel;
