import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Skeleton,
  Tabs,
  Typography,
  Spin
} from "antd";
import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";
import Store from "../../store";
import {
  ForecastResponse,
  ForecastWeather,
  WeatherResponse
} from "../../types";
import { convertTemperature } from "../../utils";
import TableData from "../TableData";
import Chart from "./LineChart";
import ReactImageGallery from "react-image-gallery";

interface DetailsProps extends RouteComponentProps<{ townId: string }> {
  store: Store;
}

interface DetailsData {
  weather: WeatherResponse;
  forecast: ForecastResponse;
}

const Details: React.FC<DetailsProps> = props => {
  const [data, setData] = useState<undefined | DetailsData>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    const townId = +props.match.params.townId;
    const { api } = props.store;
    Promise.all([api.getByCityID(townId), api.getForecastByCityId(townId)])
      .then(responses => map(responses, "data"))
      .then(allData => {
        const data = {
          forecast: allData.pop() as ForecastResponse,
          weather: allData.pop() as WeatherResponse
        };
        setData(data);
        setLoading(true);
        return data;
      })
      .then(data => api.findImages(data.weather.name))
      .then(response => {
        setImages(
          response.map(image => ({
            original: image.urls.regular,
            thumbnail: image.urls.thumb
          }))
        );
        setLoading(false);
      });
  }, [props]);

  return data ? (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Общяя погодная сводка</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Подробней о {data.weather.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Row>
          <Typography.Title>
            {data.weather.name}, {data.weather.sys.country}{" "}
            <Flag code={data.weather.sys.country} height={20} />,{" "}
            {convertTemperature(data.weather.main.temp, props.store.units)} °
            {props.store.units}
          </Typography.Title>
        </Row>
        <Row gutter={18}>
          {data.weather.weather.map(weather => (
            <Col key={weather.id} offset={1} span={3}>
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                alt={weather.description}
              />
              <Typography.Paragraph>{weather.description}</Typography.Paragraph>
            </Col>
          ))}
          <Col span={20} />
        </Row>
        <Row gutter={32}>
          <Col span={6} offset={1}>
            <TableData data={data.weather} />
          </Col>
          <Col span={16}>
            <Tabs defaultActiveKey="0">
              <Tabs.TabPane tab="Температура" key="0">
                <Chart
                  forecast={data.forecast}
                  dataProvider={(weather: ForecastWeather) =>
                    convertTemperature(weather.main.temp, props.store.units)
                  }
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Атмосферное давление" key="1">
                <Chart
                  forecast={data.forecast}
                  dataProvider={(weather: ForecastWeather) =>
                    weather.main.pressure
                  }
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Влажность воздуха" key="2">
                <Chart
                  forecast={data.forecast}
                  dataProvider={(weather: ForecastWeather) =>
                    weather.main.humidity
                  }
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={1} />
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <Spin size="large" spinning={loading}>
              {images.length === 0 ? (
                <Typography.Title
                  level={3}
                  style={{
                    margin: 80
                  }}
                >
                  К сожалению, ни одного фото не найдено, :(
                </Typography.Title>
              ) : (
                <ReactImageGallery
                  items={images}
                  thumbnailPosition="right"
                  showPlayButton={false}
                />
              )}
            </Spin>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  ) : (
    <Card>
      <Skeleton />
    </Card>
  );
};

export default Details;
