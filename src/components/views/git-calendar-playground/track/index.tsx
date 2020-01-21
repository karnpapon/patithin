import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { WeekRender } from './track-week-render';
import { CalendarTrackInfo } from './track-info'
import { createSliderWithTooltip, Range } from 'rc-slider';
import { getNewRange, mapValue, getNote } from 'utils'
import { AppContextProvider, AppContextConsumer, AppContextInterface} from 'AppContext';
import { ContributionCalendar } from 'models/ContributionCalendar'
import { Midi } from 'models/Midi'
import * as Tone from "tone";

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../index.css'
import { store } from 'store';
import { SynthEngine } from 'models/Synth';

const RangeWithTooltips = createSliderWithTooltip(Range);

export interface GitCalendarTrackProps{
  contributions: Contribution[][],
  totalCounts: number,
  UserDetails: UserDetails,
  extractedWeek: any[],
  trackIndex: number,
  isAccountMuted: boolean,
  calendar: ContributionCalendar,
  updateAccountMute: () => void,
}
export interface GitCalendarTrackState{
  steps: number[]
}

export interface MidiNoteAndVelocity{
  note: number;
  velocity: number;
}

export class GitCalendarTrack extends React.Component<GitCalendarTrackProps, GitCalendarTrackState>{

  // unsubscribe = store.subscribe(() => {
  //   let midiState = store.getState().app.midiselect;
  //   if (midiState !== this.state.isMidiOn) {
  //     this.setState({
  //       isMidiOn: midiState
  //     });
  //   } 
  // });

  constructor(props: GitCalendarTrackProps){
    super(props)
    this.state = {
      steps: [0,16],
    }
  }

  onRangeSliderChange = (value: number[]) => {
    this.setState({ steps: value })
  }

  trigger = (midi: Midi, current: number): void => {
    const { extractedWeek, trackIndex } = this.props
    midi.clear()

    if(store.getState().session.isPlaying){
      if(extractedWeek[current] !== null){
        this.getMidiNoteAndVelocity(extractedWeek[current]).forEach(m => {
          midi.send({
            channel: trackIndex ,
            octave: 3, 
            note: getNote(m.note),
            velocity: Math.ceil( mapValue(m.velocity,1,10, 60,127 ) ), 
            length: 12 
          })
        })
        midi.run()
      }
    }
  }

  runSynthEngine = (current: number, trackIndex: number, synthEngine: SynthEngine) => {
    const { extractedWeek } = this.props
    if(store.getState().session.isPlaying){
      if(extractedWeek[current] !== null){
        synthEngine.channels[trackIndex + 7].triggerAttackRelease("C2", "16n").toMaster();
      }
    }
  }

  getMidiNoteAndVelocity = (arr: number[]): MidiNoteAndVelocity[] => {
    var indexes: MidiNoteAndVelocity[] = [], i;
    for(i = 0; i < arr.length; i++){
      if (arr[i] > 0){
        indexes.push({
          note: i,
          velocity: arr[i]
        });
      }
    }
    return indexes;
  }

  // monitorTrackMute = ( isMuted: boolean ) => {
    // console.log("isTrackMuted", isMuted)
  // }

  render(){
    const { 
      contributions, 
      totalCounts, 
      UserDetails, 
      trackIndex,
      isAccountMuted,
      calendar,
      updateAccountMute
    } = this.props
    const { steps } = this.state

    return ( 
      <AppContextConsumer>
        {appContext => appContext && (
          !isAccountMuted && store.getState().app.midiselect? 
              this.trigger( appContext.midi , getNewRange(appContext.currentBeat,steps) )
            :
              store.getState().session.isPlaying? this.runSynthEngine(getNewRange(appContext.currentBeat,steps), trackIndex, appContext.synthEngine):'',
          <div className="track-container">
          <div className="track">
            { isAccountMuted ? ( <div className='muted'><p className="mute-display"> Shhhh.. </p></div> ):'' }
            <CalendarTrackInfo 
              totalCounts={totalCounts} 
              UserDetails={UserDetails} 
              trackIndex={trackIndex}
              calendar={calendar}
              updateAccountMute={updateAccountMute}
            />
            <div className="track-steps">
              <RangeWithTooltips 
                max={53} min={0}
                defaultValue={[0, 16]} 
                step={16}
                allowCross={false}
                tipFormatter={( value: number ) => `week ${value == 0? 1:value}`}
                tipProps={{ overlayClassName: 'tooltip-custom' }}
                pushable={true}
                onAfterChange={value => this.onRangeSliderChange( value )}
              />
              {/* <div className="day-selector">
                <span>*</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
              </div> */}
              <div className="weeks-table">
                {
                  contributions?
                  contributions.map(( weeks, index ) => {
                      return <WeekRender 
                        key={index} 
                        weeks={weeks} 
                        week_idx={index} 
                        steps={steps}
                        // monitorTrackMute={this.monitorTrackMute}
                      />
                  })
                  :
                  "loading.."
                }
              </div>
            </div>
          </div>
        </div>
        )}
      </AppContextConsumer>
     )
  }

}