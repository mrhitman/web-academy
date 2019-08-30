import { inject, observer } from 'mobx-react';
import Weather from './Weather';

export default inject('store')(observer<any>(Weather));
