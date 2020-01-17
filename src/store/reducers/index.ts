import { combineReducers } from 'redux';

import session from './session';
import app from './app';

export default combineReducers({
  session,
  app
});
