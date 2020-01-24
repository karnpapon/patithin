import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { store, actions } from 'store'
import { ContributionCalendar } from 'models/ContributionCalendar'
import { LevelMeter } from 'components/views/git-calendar-playground/control/level'
import { SynthEngine } from 'models/Synth'
import '../../index.css'

export interface CalendarTrackInfoProps{
  contributions: Contribution[][],
  totalCounts: number,
  UserDetails: UserDetails,
  trackIndex: number,
  calendar: ContributionCalendar,
  synthEngine: SynthEngine,
  updateAccountMute: () => void,
  setOctave: (type: string) => void,
  setChannel: (type: string) => void,
  octave: number
  channel: number
}
export interface CalendarTrackInfoState{
  volume: number
  isMidiMode: boolean
}

export class CalendarTrackInfo extends React.Component<CalendarTrackInfoProps, CalendarTrackInfoState>{

  unsubscribe = store.subscribe(() => {
    let isMidiSelect = store.getState().app.midiselect;
    if (isMidiSelect !== this.state.isMidiMode) {
      this.setState({
        isMidiMode: isMidiSelect
      });
    }
  });

  constructor(props: CalendarTrackInfoProps){
    super(props)
    this.state = {
      volume: 0,
      isMidiMode: false
    }
  }

  volumeUpdateListener = this.onVolumeUpdate.bind(this);
  onVolumeUpdate(newVolume: number) {
    const { synthEngine, trackIndex } = this.props;
    synthEngine.setVolume(newVolume, trackIndex);
    this.setState({
      volume: this.state.volume + 1
    });
  }

  handleRemoveTrack(id: number){
    store.dispatch(actions.deleteUserCollectionData(id))
  }

  handleMuteTrack(){
    this.props.calendar.isAccountMuted = !this.props.calendar.isAccountMuted
    this.props.updateAccountMute()
  }

  abbrevName(name: string): string{
    var n = name.split(' ');
    return n[0].charAt(0).toUpperCase()+ "." + n[1].charAt(0).toUpperCase() + "."
  }

  formattedDate(d: Date): string {
    let date: string
    return date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('-');
  }

  render(){

    const { 
      contributions,
      totalCounts, 
      UserDetails, 
      trackIndex,
      calendar, 
      synthEngine ,
      setOctave,
      setChannel,
      channel,
      octave
    } = this.props
    const { isMidiMode } = this.state
    
    return (
        <>
        <div className="track-title"> 
          <div className="track-control">
            <div className="delete-track" onClick={() => this.handleRemoveTrack(UserDetails.user_id)}>x</div>
            <div 
              className={ `mute-track ${calendar.isAccountMuted? 'mute-active':''}` } 
              onClick={() => this.handleMuteTrack()}>
                {calendar.isAccountMuted? 'muted':'mute'}
            </div>
          </div>
          <OctaveButton setOctave={setOctave} octave={octave}/>
          <div className="abbrev-name">{this.abbrevName(UserDetails.user_name)}</div> 
          <div className={ `track-bloc ${isMidiMode? 'level-off':''}` } data-title='volume'>
            <LevelMeter  
              progress={synthEngine.volume}
              onUpdate={this.volumeUpdateListener}
              unitType="%"
              disabled={isMidiMode}
            /> 
          </div>
          <ChannelButton setChannel={setChannel} channel={channel}/>
        </div>

        <div className="track-info">
          <p className="no-t-margin"> github/{UserDetails.user_login} </p>
          <div className="contrib-count">
            <div className="counts">
              <p>{totalCounts}</p>  
              <i className="icon-contributions"> </i> 
            </div>
            contributions
          </div>
          <div className="contrib-date">
            <p> from: {this.formattedDate(contributions[0][0].date)} </p>
            <p> to: {this.formattedDate(new Date())} </p>
            <br/>
            <b> location: {UserDetails.user_location}</b>
            <p> name: {UserDetails.user_name}</p>
          </div>
        </div> 
        </>
    )
  }

}

export interface OctaveButtonProps{
  setOctave: (type: string) => void,
  octave: number
}

class OctaveButton extends React.Component<OctaveButtonProps>{
  render(){
    const { setOctave, octave } = this.props
    return (
      <div className="octave">
        {/* <div className="octave-btn-wrapper"> */}
          <div className="octave-btn btn-up" onClick={() => setOctave('down')}> - </div>
          <div className="octave-display"><p>oct: {octave}</p></div>
          <div className="octave-btn btn-down" onClick={() => setOctave('up')}> + </div>
        {/* </div> */}
      </div>
    )
  }
}

export interface ChannelButtonProps{
  setChannel: (type: string) => void,
  channel: number
}

class ChannelButton extends React.Component<ChannelButtonProps>{
  render(){
    const { setChannel, channel } = this.props
    return (
      <div className="octave">
          <div className="octave-btn btn-up" onClick={() => setChannel('down')}> - </div>
          <div className="octave-display"><p>chan: {channel}</p></div>
          <div className="octave-btn btn-down" onClick={() => setChannel('up')}> + </div>
      </div>
    )
  }
}