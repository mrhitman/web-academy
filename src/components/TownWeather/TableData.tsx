import { Table } from 'antd';
import { find } from 'lodash';
import { DateTime } from 'luxon';
import React from 'react';
import { WeatherResponse } from '../../types';
import { windRoses, windSpeed } from '../../utils';
import MapUrl from './MapUrl';

function getWindValue(data: WeatherResponse) {
  const name = find(windSpeed, (wind) => data.wind.speed <= wind.speed)!.name;
  let value = `${name}, ${data.wind.speed} m/s`;

  if (data.wind.deg) {
    const wind = find(windRoses, (wind) => data.wind.deg <= wind.angle);
    return `${value} , ${wind!.name} (${data.wind.deg}°)`;
  }
  return value;
}

const TableData: React.FC<{ data: WeatherResponse }> = (props) => {
  const { data } = props;
  return (
    <Table
      dataSource={[
        { key: 1, name: 'Ветер', value: getWindValue(data) },
        { key: 2, name: 'Облачность', value: `${data.clouds.all} %` },
        { key: 3, name: 'Атмосферное давление', value: `${data.main.pressure} hpa` },
        { key: 4, name: 'Влажность', value: `${data.main.humidity} %` },
        { key: 5, name: 'Восход', value: DateTime.fromSeconds(data.sys.sunrise).toFormat('HH:mm') },
        { key: 6, name: 'Закат', value: DateTime.fromSeconds(data.sys.sunset).toFormat('HH:mm') },
        { key: 7, name: 'Гео позиция', value: <MapUrl {...data.coord} /> }
      ]}
      columns={[ { dataIndex: 'name', key: 'name' }, { dataIndex: 'value', key: 'value' } ]}
      showHeader={false}
      pagination={false}
    />
  );
};

export default TableData;
