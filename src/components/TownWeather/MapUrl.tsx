import React from 'react';

const MapUrl: React.FC<{ lat: number; lon: number }> = (props) => {
  const baseUrl = 'https://openweathermap.org/weathermap';
  return (
    <a
      target="blank"
      href={`${baseUrl}?basemap=map&cities=true&layer=temperature&lat=${props.lat}&lon=${props.lon}`}
    >{`[${props.lat},${props.lon}]`}</a>
  );
};

export default MapUrl;
