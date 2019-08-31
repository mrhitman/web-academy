import React from 'react';
import { Card, Skeleton } from 'antd';

const EmptyWeather = () => {
  return (
    <Card className="weather-card">
      <Skeleton active />
    </Card>
  );
};

export default EmptyWeather;
