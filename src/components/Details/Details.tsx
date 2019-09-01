import { Breadcrumb, Card, Col, Row, Skeleton, Tabs, Typography } from 'antd';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags';
import Store from '../../store';
import { ForecastResponse, ForecastWeather, WeatherResponse } from '../../types';
import { convertTemperature } from '../../utils';
import TableData from '../TableData';
import Chart from './LineChart';

interface DetailsProps extends RouteComponentProps<{ townId: string }> {
  store: Store;
}

interface DetailsData {
  weather: WeatherResponse;
  forecast: ForecastResponse;
}

const Details: React.FC<DetailsProps> = (props) => {
  const [ data, setData ] = useState<undefined | DetailsData>(undefined);

  useEffect(
    () => {
      const townId = +props.match.params.townId;
      Promise.all([ props.store.api.getByCityID(townId), props.store.api.getForecastByCityId(townId) ])
        .then((responses) => map(responses, 'data'))
        .then((allData) => {
          setData({
            forecast: allData.pop() as ForecastResponse,
            weather: allData.pop() as WeatherResponse
          });
        });
    },
    [ props ]
  );

  return data ? (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Общяя погодная сводка</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Подробней о {data.weather.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Row>
          <Typography.Title>
            {data.weather.name}, {data.weather.sys.country} <Flag code={data.weather.sys.country} height={20} />,{' '}
            {convertTemperature(data.weather.main.temp, props.store.units)} °{props.store.units}
          </Typography.Title>
        </Row>
        <Row gutter={32}>
          <Col span={6} offset={1}>
            <TableData data={data.weather} />
          </Col>
          <Col span={16}>
            <Tabs defaultActiveKey="0">
              <Tabs.TabPane tab="Temperature" key="0">
                <Chart
                  forecast={data.forecast}
                  dataProvider={(weather: ForecastWeather) => convertTemperature(weather.main.temp, props.store.units)}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Pressure" key="1">
                <Chart forecast={data.forecast} dataProvider={(weather: ForecastWeather) => weather.main.pressure} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Humidity" key="2">
                <Chart forecast={data.forecast} dataProvider={(weather: ForecastWeather) => weather.main.humidity} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={1} />
        </Row>
      </Card>
    </React.Fragment>
  ) : (
    <Card>
      <Skeleton />
    </Card>
  );
};

export default Details;
