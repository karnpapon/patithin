import { combineReducers } from 'redux';
import { loading } from './control';
import { metronome } from './metronome';
import { midiselect } from './midiselect';

export default combineReducers({
  loading,
  metronome,
  midiselect
});
