import * as React from 'react';

export interface AppContextInterface {
  currentBeat: number,
}

const ctx = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctx.Provider;
  
export const AppContextConsumer = ctx.Consumer;