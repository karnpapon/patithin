import { Metronome } from 'models/Metronome'

export interface MetronomeAction {
    type: string;
    metronome: Metronome;
}
  
export function metronome(state: Metronome = null, action: MetronomeAction): Metronome {
  switch (action.type) {
    case 'SET_APP_METRONOME_DATA':
    return action.metronome;
    default:
    return state;
  }
}
  