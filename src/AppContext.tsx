import * as React from 'react';
import { Metronome } from 'models/Metronome';
import { Midi } from 'models/Midi';

export interface AppContextInterface {
  currentBeat: number,
  metronome: Metronome,
  midi: Midi,
}

export const ctx = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctx.Provider;
export const AppContextConsumer = ctx.Consumer;