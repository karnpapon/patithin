import * as React from 'react';
import { store, actions } from 'store';
import { Metronome } from 'models/Metronome'
import { AppContextConsumer, AppContextInterface } from 'AppContext';
import { BpmControl } from '../bpm';
import { MidiSelect } from '../midiselect';
import '../index.css';

export interface PlayControlProps {
}

export interface PlayControlState {
  isPlaying: boolean;
}

export class PlayControl extends React.Component<PlayControlProps, PlayControlState> {
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
          <div className='track-play'>
            {/* <Credits/> */}
            <div className="control">
              <MidiSelect/>
              <BpmControl/> 
              {
              this.state.isPlaying ? 
                <ButtonPause handlePlay={this.clickListener.bind(this)} ctx={appContext.metronome}/> 
                : 
                <ButtonPlay handlePlay={this.clickListener.bind(this)} ctx={appContext.metronome}/>
              }
            </div>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export interface ButtonProps{
  handlePlay: (event: React.MouseEvent, ctx: any) => void;
  ctx: Metronome
}

export interface CreditsProps{}

class Credits extends React.Component<CreditsProps>{
  render(){
    return (
      <div className="credits">
          <i className="icon-git"></i>
          <p className="credit-texts">by Karnpapon Boonput</p>
        </div>
    )
  }
}

class ButtonPlay extends React.Component<ButtonProps> {
  render() {
    const {  handlePlay, ctx } = this.props
    return (
      <svg
        className='play-btn controlbar-item-content'
        viewBox='0 0 16 16'
        onClick={(e) => handlePlay(e, ctx)}
      >
        <polygon points='3,3 14,8 3,13 ' />
      </svg>
    );
  }
}

class ButtonPause extends React.Component<ButtonProps> {
  render() {
    const {  handlePlay, ctx } = this.props
    return (
      <svg
        className='play-btn controlbar-item-content'
        viewBox='0 0 16 16'
        onClick={(e) => handlePlay(e, ctx)}
      >
        <line x1='4' y1='2' x2='4' y2='14' />
        <line x1='12' y1='2' x2='12' y2='14' />
      </svg>
    );
  }
}
