import { inject, observer } from 'mobx-react';
import Panel from './Panel';

export default inject('store')(observer<any>(Panel));
