import { Card, Icon, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Flag from 'react-world-flags';
import Store from '../../store';
import { WeatherResponse } from '../../types';
import { convertTemperature } from '../../utils';
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

  if (!data) {
    return <Spin />;
  }
  return (
    <Card
      title={
        <div>
          {data.name},
          {data.sys.country} <Flag code={data.sys.country} height={12} />,
          {convertTemperature(data.main.temp, props.store.units)} °{props.store.units}
        </div>
      }
      actions={[
        <Icon type="more" key="more" />,
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
      {data.weather.map((weather) => (
        <img key={weather.id} src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.description} />
      ))}
      <TableData data={data} />
    </Card>
  );
};

export default Weather;
