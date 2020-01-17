import { combineReducers } from 'redux';
import { bpm } from './bpm';
import { currentSeqPosition } from './CurrentSeqPosition';
import { isPlaying } from './isPlaying';
import { setUserId } from './setUserId';
import { UserContributions } from './UserContributions'

export default combineReducers({
  bpm,
  currentSeqPosition,
  isPlaying,
  setUserId,
  UserContributions
});
