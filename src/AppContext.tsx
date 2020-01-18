import * as React from 'react';
import { Metronome } from 'models/Metronome';

export interface AppContextInterface {
  currentBeat: number,
  metronome: Metronome
}

const ctx = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctx.Provider;
export const AppContextConsumer = ctx.Consumer;