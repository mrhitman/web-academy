import { Card, Col, Icon, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags';
import Store from '../../store';
import { WeatherResponse } from '../../types';
import { convertTemperature } from '../../utils';
import EmptyWeather from './EmptyWeather';
import TableData from './TableData';

interface WeatherProps {
  store: Store;
  id: number;
}

const Weather: React.FC<WeatherProps> = (props) => {
  const [ data, setData ] = useState<undefined | WeatherResponse>(undefined);

  useEffect(
    () => {
      props.store.api.getByCityID(props.id).then((response) => setData(response.data));
    },
    [ props ]
  );

  return data ? (
    <Card
      className="weather-card"
      title={
        <Link to={`/details/${data.id}`}>
          {data.name},
          {data.sys.country} <Flag code={data.sys.country} height={12} />,
          {convertTemperature(data.main.temp, props.store.units)} °{props.store.units}
        </Link>
      }
      actions={[
        <Link to={`/details/${data.id}`}>
          <Icon type="more" key="more" />
        </Link>,
        <Icon
          type="delete"
          key="delete"
          onClick={() => {
            if (window.confirm('Do you really want to delete this town?')) {
              props.store.removeTown(props.id);
            }
          }}
        />
      ]}
    >
      <Row gutter={18}>
        {data.weather.map((weather) => (
          <Col key={weather.id} span={8}>
            <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.description} />
            <Typography.Paragraph>{weather.description}</Typography.Paragraph>
          </Col>
        ))}
      </Row>
      <TableData data={data} />
    </Card>
  ) : (
    <EmptyWeather />
  );
};

export default Weather;
