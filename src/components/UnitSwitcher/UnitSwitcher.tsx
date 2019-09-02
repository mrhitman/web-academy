import React from "react";
import { Switch } from "antd";
import Store from "../../store";

interface UnitSwitcherProps {
  store: Store;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = props => {
  return (
    <Switch
      checkedChildren="°C"
      unCheckedChildren="°F"
      checked={props.store.units === "C"}
      style={{ marginLeft: 20 }}
      onChange={props.store.toggleUnits}
    />
  );
};

export default UnitSwitcher;
