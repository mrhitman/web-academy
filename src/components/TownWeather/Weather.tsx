import React, { useState, useEffect } from "react";
import Store from "../../store";
import { Card, Spin } from "antd";
import { WeatherResponse } from "../../types";

interface WeatherProps {
  store: Store;
  town: string;
}

const Weather: React.FC<WeatherProps> = props => {
  const [data, setData] = useState<undefined | WeatherResponse>(undefined);

  useEffect(() => {
    props.store.api
      .getByCityName(props.town)
      .then(response => setData(response.data));
  }, [props]);

  if (!data) {
    return <Spin />;
  }
  return (
    <Card style={{ width: 400 }} title={props.town}>
      {data.weather.map(weather => (
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
          alt={weather.description}
        />
      ))}
      {JSON.stringify(data)};
    </Card>
  );
};

export default Weather;
