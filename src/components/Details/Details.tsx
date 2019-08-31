import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Details: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Общяя погодная сводка</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Подробней о</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Details;
