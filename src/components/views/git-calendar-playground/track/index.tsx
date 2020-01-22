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
  synthEngine: SynthEngine;
}

export interface MidiNoteAndVelocity{
  note: number;
  velocity: number;
}

export class GitCalendarTrack extends React.Component<GitCalendarTrackProps, GitCalendarTrackState>{

  constructor(props: GitCalendarTrackProps){
    super(props)
    this.state = {
      steps: [0,16],
      synthEngine: new SynthEngine(this)
    }
  }

  onRangeSliderChange = (value: number[]) => {
    this.setState({ steps: value })
  }

  /**
   * sending midi
   */
  runMidi = (midi: Midi, current: number): void => {
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

  /**
   * send trigger to Internal synth(default), currently chan 0 = polyphony synth.
   */
  runSynthEngine = (current: number, trackIndex: number) => {
    const { extractedWeek } = this.props
    const { synthEngine } = this.state
    let polyNotes: string[] = []
    let singleNote: string = 'C'
    if(extractedWeek[current] !== null){
      this.getMidiNoteAndVelocity(extractedWeek[current]).forEach(m => {
        singleNote = getNote(m.note, 'harmonic-minor')
        singleNote = singleNote + "4"
        polyNotes.push(singleNote)
      })
      if(trackIndex == 0){
        this.runPolySynth(synthEngine, trackIndex, polyNotes)
      } else {
        this.runMonoSynth(synthEngine, trackIndex, singleNote) 
      }
    }
  }

  runPolySynth(synth: SynthEngine, index: number, notes: string[]){
    synth.runPolySynth(index,notes);
  } 

  runMonoSynth(synth: SynthEngine, index: number, note: string){
    synth.runMonoSynth(index,note)
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

  componentDidMount(){
    this.state.synthEngine.init()
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
      updateAccountMute,
    } = this.props
    const { steps, synthEngine  } = this.state

    return ( 
      <AppContextConsumer>
        {appContext => appContext && (
          !isAccountMuted && store.getState().app.midiselect? 
              this.runMidi( appContext.midi , getNewRange(appContext.currentBeat,steps) )
            :
              store.getState().session.isPlaying && 
              !store.getState().app.midiselect && 
              !isAccountMuted ? 
                this.runSynthEngine(getNewRange(appContext.currentBeat,steps), trackIndex):'',
          <div className="track-container">
          <div className="track">
            { isAccountMuted ? ( <div className='muted'><p className="mute-display"> Shhhh.. </p></div> ):'' }
            <CalendarTrackInfo 
              totalCounts={totalCounts} 
              UserDetails={UserDetails} 
              trackIndex={trackIndex}
              calendar={calendar}
              updateAccountMute={updateAccountMute}
              synthEngine={synthEngine}
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