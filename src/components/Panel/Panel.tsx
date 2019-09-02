import { Col, Row } from "antd";
import React from "react";
import Store from "../../store";
import Weather from "../TownWeather/Weather.container";

interface PanelProps {
  store: Store;
}

const Panel: React.FC<PanelProps> = props => {
  return (
    <Row gutter={12}>
      {props.store.towns.map(id => (
        <Col key={id} lg={6} md={8} sm={12} xs={24}>
          <Weather id={id} />
        </Col>
      ))}
    </Row>
  );
};

export default Panel;
