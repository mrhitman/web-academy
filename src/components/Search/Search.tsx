import { AutoComplete, Button, Icon, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Flag from "react-world-flags";
import Store from "../../store";
import { FindItem, FindResponse } from "../../types";

interface SearchProps {
  store: Store;
}

function renderOption(item: FindItem) {
  return (
    <AutoComplete.Option key={item.id} title={item.name}>
      <div className="global-search-item">
        <span className="global-search-item-desc">
          {item.name}, {item.sys.country},{" "}
          <Flag code={item.sys.country} height={16} />, [{item.coord.lat},
          {item.coord.lon}]
        </span>
      </div>
    </AutoComplete.Option>
  );
}

const Search: React.FC<SearchProps> = props => {
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState<FindResponse | undefined>(
    undefined
  );

  useEffect(() => {
    if (value.length > 3) {
      props.store.api.findTown(value).then(response => {
        setDataSource({
          ...response.data,
          list: response.data.list.filter(
            item => props.store.towns.indexOf(item.id) === -1
          )
        });
      });
    } else {
      setDataSource(undefined);
    }
  }, [value, props.store]);

  return (
    <Fragment>
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          optionLabelProp="text"
          dataSource={dataSource ? dataSource.list.map(renderOption) : []}
          onSearch={setValue}
          onSelect={item => {
            props.store.addTown(+item);
            setValue("");
          }}
        >
          <Input
            suffix={
              <Button
                className="search-btn"
                style={{ marginRight: -12 }}
                size="large"
                type="primary"
              >
                <Icon type="search" />
              </Button>
            }
          />
        </AutoComplete>
      </div>
    </Fragment>
  );
};

export default Search;
