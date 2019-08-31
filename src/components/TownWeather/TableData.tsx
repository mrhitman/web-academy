import { Table } from 'antd';
import { DateTime } from 'luxon';
import React from 'react';
import { WeatherResponse } from '../../types';

function getMapUrl(data: WeatherResponse) {
  const baseUrl = 'https://openweathermap.org/weathermap';
  return (
    <a
      target="blank"
      href={`${baseUrl}?basemap=map&cities=true&layer=temperature&lat=${data.coord.lat}&lon=${data.coord.lon}&zoom=5`}
    >{`[${data.coord.lat},${data.coord.lon}]`}</a>
  );
}

const TableData: React.FC<{ data: WeatherResponse }> = (props) => {
  const { data } = props;
  return (
    <Table
      dataSource={[
        { key: 1, name: 'Wind', value: 'Gentle Breeze, 5.1 m/s, West-southwest ( 240 )' },
        { key: 2, name: 'Cloudiness', value: 'Sky is clear' },
        { key: 3, name: 'Pressure', value: `${data.main.pressure} hpa` },
        { key: 4, name: 'Humidity', value: `${data.main.humidity} %` },
        { key: 5, name: 'Sunrise', value: DateTime.fromSeconds(data.sys.sunrise).toFormat('HH:mm') },
        { key: 6, name: 'Sunset', value: DateTime.fromSeconds(data.sys.sunset).toFormat('HH:mm') },
        { key: 7, name: 'Geo coords	', value: getMapUrl(data) }
      ]}
      columns={[ { dataIndex: 'name', key: 'name' }, { dataIndex: 'value', key: 'value' } ]}
      showHeader={false}
      pagination={false}
    />
  );
};

export default TableData;
