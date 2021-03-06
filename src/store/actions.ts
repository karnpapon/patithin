import { BpmAction } from './reducers/session/bpm';
import { CurrentSeqPositionAction } from './reducers/session/CurrentSeqPosition';
import { PlayingAction } from './reducers/session/isPlaying';
import { setUserIdAction } from './reducers/session/setUserId';
import { ContributionCalendar } from 'models/ContributionCalendar';
import { UserContributionsAction } from './reducers/session/UserContributions'
import { AppControlAction } from './reducers/app/control'
import { MetronomeAction } from './reducers/app/metronome'
import { MidiSelectAction } from './reducers/app/midiselect'

import { Metronome } from 'models/Metronome'


export const setAppLoadingData = (state: boolean): AppControlAction => ({
  type: 'SET_APP_LOADING_DATA',
  state
})

export const setAppMetronomeData = (metronome: Metronome): MetronomeAction => ({
  type: 'SET_APP_METRONOME_DATA',
  metronome
})

export const setBpm = (value: number): BpmAction => ({
  type: 'SET_BPM',
  value
});

export const setCurrentSeqPosition = (index: number): CurrentSeqPositionAction => ({
  type: 'SET_CURRECT_BIT',
  value: index
});

export const play = (value: boolean): PlayingAction => ({
  type: 'IS_PLAYING',
  value
});
export const togglePlaying = (): PlayingAction => ({
  type: 'TOGGLE_PLAYING'
});

// git-calendar-playground
export  const setUserIdInput = ( value: string): setUserIdAction => ({
  type: 'SET_USER_ID_INPUT',
  value
})

export const setUserCollectionsData = (data: ContributionCalendar): UserContributionsAction => ({
  type: 'SET_USER_COLLECTIONS_DATA',
  data,
  id: undefined
})

export const deleteUserCollectionData = ( id: number ): UserContributionsAction => ({
  type: 'DELETE_USER_COLLECTIONS_DATA',
  data: undefined,
  id
})

export const toggleMidiSelection = (): MidiSelectAction => ({
  type: 'TOGGLE_MIDI_SELECTION'
})