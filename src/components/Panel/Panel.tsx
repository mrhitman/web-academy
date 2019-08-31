import { Col, Row } from 'antd';
import React from 'react';
import Store from '../../store';
import Weather from '../TownWeather/Weather.container';

interface PanelProps {
  store: Store;
}

const Panel: React.FC<PanelProps> = (props) => {
  return (
    <Row gutter={16}>
      {/* <Switch checkedChildren="°C" unCheckedChildren="°F" defaultChecked onChange={props.store.toggleUnits} /> */}
      {props.store.towns.map((id) => (
        <Col key={id} span={6}>
          <Weather id={id} />
        </Col>
      ))}
    </Row>
  );
};

export default Panel;
