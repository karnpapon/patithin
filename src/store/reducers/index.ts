import { combineReducers } from 'redux';

import session from './session';
import {loading} from './app';

export default combineReducers({
  session,
  loading
});
