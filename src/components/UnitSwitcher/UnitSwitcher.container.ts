import { inject, observer } from "mobx-react";
import UnitSwitcher from "./UnitSwitcher";

export default inject("store")(observer<any>(UnitSwitcher));
