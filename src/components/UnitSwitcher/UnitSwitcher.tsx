import { Switch } from "antd";
import React, { Fragment } from "react";
import Store from "../../store";

interface UnitSwitcherProps {
  store: Store;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = props => {
  return (
    <Fragment>
      <Switch
        checkedChildren="°C"
        unCheckedChildren="°F"
        checked={props.store.units === "C"}
        style={{ marginLeft: 20 }}
        onChange={props.store.toggleUnits}
      />
    </Fragment>
  );
};

export default UnitSwitcher;
