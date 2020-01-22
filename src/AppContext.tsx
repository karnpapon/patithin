import * as React from 'react';
import { Metronome } from 'models/Metronome';
import { Midi } from 'models/Midi';
import { SynthEngine } from 'models/Synth';

export interface AppContextInterface {
  currentBeat: number,
  metronome: Metronome,
  midi: Midi,
}

const ctx = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctx.Provider;
export const AppContextConsumer = ctx.Consumer;