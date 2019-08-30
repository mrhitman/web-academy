import { Col, Row } from 'antd';
import React from 'react';
import Weather from '../TownWeather/Weather.container';
import Store from '../../store';

interface PanelProps {
  store: Store;
}

const Panel: React.FC<PanelProps> = (props) => {
  return (
    <Row gutter={16}>
      {props.store.towns.map((town) => (
        <Col key={town.name} span={6}>
          <Weather town={town.name} country={town.country} />
        </Col>
      ))}
    </Row>
  );
};

export default Panel;
