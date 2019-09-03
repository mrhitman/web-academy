import { inject, observer } from "mobx-react";
import Search from "./Search";

export default inject("store")(observer<any>(Search));
