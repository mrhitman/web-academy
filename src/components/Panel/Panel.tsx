import { Col, Row } from "antd";
import React, { Fragment, useEffect } from "react";
import Store from "../../store";
import Search from "../Search/Search.container";
import Weather from "../TownWeather/Weather.container";

interface PanelProps {
  store: Store;
}

const Panel: React.FC<PanelProps> = props => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        props.store.api
          .getByGeoCoords({
            lon: position.coords.longitude,
            lat: position.coords.latitude
          })
          .then(response => response.data)
          .then(response => {
            if (props.store.towns.indexOf(response.id) > -1) {
              return;
            }
            if (
              window.confirm(
                `Добавить текущее месторасположение, (${response.name})?`
              )
            ) {
              props.store.addTown(response.id);
            }
          });
      });
    }
  }, [props.store]);

  return (
    <Fragment>
      <Row>
        <Col offset={18} span={6}>
          <Search />
        </Col>
      </Row>
      <Row gutter={12}>
        {props.store.towns.map(id => (
          <Col key={id} lg={6} md={8} sm={12} xs={24}>
            <Weather id={id} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default Panel;
