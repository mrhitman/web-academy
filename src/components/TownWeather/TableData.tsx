import { Table } from 'antd';
import { DateTime } from 'luxon';
import React from 'react';
import { WeatherResponse } from '../../types';
import { reduce, find } from 'lodash';

function getWindValue(data: WeatherResponse) {
  const windSpeed = [
    { speed: 1, name: 'Штиль' },
    { speed: 5, name: 'Тихий' },
    { speed: 11, name: 'Легкий' },
    { speed: 19, name: 'Слабый' },
    { speed: 28, name: 'Умеренный' },
    { speed: 38, name: 'Свежий' },
    { speed: 49, name: 'Сильный' },
    { speed: 61, name: 'Крепкий' },
    { speed: 74, name: 'Очень крепкий' },
    { speed: 88, name: 'Шторм' },
    { speed: 102, name: 'Сильный шторм' },
    { speed: 117, name: 'Жестокий шторм' },
    { speed: 300, name: 'Ураган' }
  ];
  const name = find(windSpeed, (wind) => data.wind.speed < wind.speed)!.name;
  let value = `${name}, ${data.wind.speed} m/s`;
  const windRose = {
    C: 22.3,
    ССВ: 45,
    СВ: 67.3,
    ВВС: 90,
    В: 112.3,
    ВЮВ: 135,
    ЮВ: 157.3,
    ЮЮВ: 180,
    Ю: 202.3,
    ЮЮЗ: 225,
    ЮЗ: 247.3,
    ЗЮЗ: 270,
    З: 292.3,
    ЗСЗ: 315,
    СЗ: 337.3,
    ССЗ: 360
  };
  if (data.wind.deg) {
    const direction = reduce(windRose, (acc, value, name) => (acc || value < data.wind.deg ? acc : name), '');
    return `${value} , ${direction} (${data.wind.deg})`;
  }
  return value;
}

function getMapUrl(data: WeatherResponse) {
  const baseUrl = 'https://openweathermap.org/weathermap';
  return (
    <a
      target="blank"
      href={`${baseUrl}?basemap=map&cities=true&layer=temperature&lat=${data.coord.lat}&lon=${data.coord.lon}`}
    >{`[${data.coord.lat},${data.coord.lon}]`}</a>
  );
}

const TableData: React.FC<{ data: WeatherResponse }> = (props) => {
  const { data } = props;
  return (
    <Table
      dataSource={[
        { key: 1, name: 'Wind', value: getWindValue(data) },
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
