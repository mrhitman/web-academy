import { Breadcrumb, Card, Skeleton } from 'antd';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Store from '../../store';
import { ForecastResponse, WeatherResponse } from '../../types';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import { convertTemperature } from '../../utils';
import { DateTime } from 'luxon';

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

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Общяя погодная сводка</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Подробней о {data && data.weather.name}</Breadcrumb.Item>
      </Breadcrumb>
      {data ? (
        <Card>
          <LineChart
            width={920}
            height={400}
            data={data.forecast.list.map((weather) => {
              return {
                name: DateTime.fromSeconds(weather.dt).toFormat('HH:mm'),
                uv: convertTemperature(weather.main.temp, props.store.units),
                amt: 2400
              };
            })}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </Card>
      ) : (
        <Card>
          <Skeleton />
        </Card>
      )}
    </React.Fragment>
  );
};

export default Details;
