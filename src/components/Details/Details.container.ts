import { inject, observer } from "mobx-react";
import Details from "./Details";

export default inject("store")(observer<any>(Details));
