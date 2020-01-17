import { combineReducers } from 'redux';
import { loading } from './control';
import { metronome } from './metronome';

export default combineReducers({
  loading,
  metronome
});
