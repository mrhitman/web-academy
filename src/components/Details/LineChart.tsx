import { DateTime } from "luxon";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ForecastResponse, ForecastWeather } from "../../types";

interface ChartProps {
  forecast: ForecastResponse;
  dataProvider: (weather: ForecastWeather) => number;
}

export const Chart: React.FC<ChartProps> = props => {
  return (
    <LineChart
      width={920}
      height={400}
      data={props.forecast.list.map(weather => {
        return {
          name: DateTime.fromSeconds(weather.dt).toFormat("HH:mm"),
          uv: props.dataProvider(weather)
        };
      })}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
};

export default Chart;
