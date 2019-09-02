import { AutoComplete, Switch } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import Store from '../../store';
import { FindResponse } from '../../types';

interface UnitSwitcherProps {
  store: Store;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = (props) => {
  const [ value, setValue ] = useState('');
  const [ dataSource, setDataSource ] = useState<FindResponse | undefined>(undefined);

  useEffect(
    () => {
      if (value.length > 3) {
        props.store.api.findTown(value).then((response) => {
          setDataSource(response.data);
        });
      }
    },
    [ value, props.store.api ]
  );

  return (
    <Fragment>
      <Switch
        checkedChildren="°C"
        unCheckedChildren="°F"
        checked={props.store.units === 'C'}
        style={{ marginLeft: 20 }}
        onChange={props.store.toggleUnits}
      />
      <AutoComplete
        style={{ marginLeft: 40 }}
        dataSource={dataSource ? dataSource.list.map((r) => ({ text: r.name, value: r.id.toString() })) : []}
        onSearch={setValue}
        onSelect={(item) => props.store.addTown(+item)}
      />
    </Fragment>
  );
};

export default UnitSwitcher;
