import * as React from 'react';
import { store, actions } from 'store';
import { Metronome } from 'models/Metronome'
import { AppContextConsumer } from 'AppContext';
import '../index.css';

export interface CalendarControlProps {
}

export interface CalendarControlState {
  isPlaying: boolean;
}

export class CalendarControl extends React.Component<CalendarControlProps, CalendarControlState> {
  clickListener = this.onClick.bind(this);
  unsubscribe = store.subscribe(() => {
    const isPlaying = store.getState().session.isPlaying;
    if (isPlaying !== this.state.isPlaying) {
      this.setState({
        isPlaying
      });
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      isPlaying: store.getState().session.isPlaying
    };
  }

  onClick(e: React.WheelEvent, metronome: Metronome) {
    // End event
    e.stopPropagation();
    e.preventDefault();
    store.dispatch(actions.play(!this.state.isPlaying));
    metronome.play()
  }

  render() {
    return (
      <AppContextConsumer>
        {appContext => appContext && (
          <div
            className='track-play'
            onClick={(e) => this.clickListener(e, appContext.metronome)}
          >
            {this.state.isPlaying ? <ButtonPause /> : <ButtonPlay />}
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

class ButtonPlay extends React.Component {
  render() {
    return (
      <svg
        className='play-btn controlbar-item-content'
        viewBox='0 0 16 16'
      >
        <polygon points='3,3 14,8 3,13 ' />
      </svg>
    );
  }
}

class ButtonPause extends React.Component {
  render() {
    return (
      <svg
        className='play-btn controlbar-item-content'
        viewBox='0 0 16 16'
      >
        <line x1='4' y1='2' x2='4' y2='14' />
        <line x1='12' y1='2' x2='12' y2='14' />
      </svg>
    );
  }
}
