import { Breadcrumb, Card, Skeleton, Tabs, Row, Col } from 'antd';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Store from '../../store';
import { ForecastResponse, WeatherResponse } from '../../types';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import { convertTemperature } from '../../utils';
import { DateTime } from 'luxon';
import TableData from '../TableData';

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
        <Row gutter={32}>
          <Col span={6} offset={1}>
            <TableData data={data.weather} />
          </Col>
          <Col span={16}>
            <Tabs defaultActiveKey="0">
              <Tabs.TabPane tab="Temperature" key="0">
                <LineChart
                  width={920}
                  height={400}
                  data={data.forecast.list.map((weather) => {
                    return {
                      name: DateTime.fromSeconds(weather.dt).toFormat('HH:mm'),
                      uv: convertTemperature(weather.main.temp, props.store.units)
                    };
                  })}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                </LineChart>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Pressure" key="1" />
              <Tabs.TabPane tab="Huminity" key="2" />
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
