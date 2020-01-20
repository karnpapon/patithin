import * as React from 'react';
import { store, actions } from 'store';
import { Metronome } from 'models/Metronome'
import { AppContextConsumer } from 'AppContext';
import '../index.css';
import { PlayControl } from './play';


export interface CalendarControlProps {
}

export interface CalendarControlState {
  
}

export class CalendarControl extends React.Component<CalendarControlProps, CalendarControlState> {

  constructor(props: any) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return ( <PlayControl/>);
  }
}