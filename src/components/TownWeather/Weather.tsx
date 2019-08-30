import { Card, List, Spin, Button, Icon } from 'antd';
import React, { useEffect, useState } from 'react';
import Flag from 'react-world-flags';
import Store from '../../store';
import { WeatherResponse } from '../../types';
import { convertTemperature } from '../../utils';

interface WeatherProps {
  store: Store;
  town: string;
  country?: string;
}

const Weather: React.FC<WeatherProps> = (props) => {
  const [ data, setData ] = useState<undefined | WeatherResponse>(undefined);

  useEffect(
    () => {
      props.store.api.getByCityName(props.town).then((response) => setData(response.data));
    },
    [ props ]
  );

  if (!data) {
    return <Spin />;
  }
  const cc = props.country || data.sys.country;
  return (
    <Card
      style={{ height: 500 }}
      title={
        <div>
          {props.town},
          {cc} <Flag code={cc} height={12} />,
          {convertTemperature(data.main.temp, props.store.units)} °{props.store.units}
        </div>
      }
      actions={[ <Icon type="delete" key="delete" onClick={() => props.store.removeTown(props.town)} /> ]}
    >
      <List>
        {data.weather.map((weather) => (
          <img
            key={weather.id}
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
          />
        ))}
      </List>
      {/* {JSON.stringify(data)} */}
    </Card>
  );
};

export default Weather;
