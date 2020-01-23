import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { WeekRender } from './track-week-render';
import { CalendarTrackInfo } from './track-info'
import { createSliderWithTooltip, Range } from 'rc-slider';
import { getNewRange, mapValue, getNote } from 'utils'
import { AppContextConsumer, ctx} from 'AppContext';
import { ContributionCalendar } from 'models/ContributionCalendar'
import { Nullable } from 'components/common/types'
import { Midi } from 'models/Midi'

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
  // limitedSteps: Nullable<number>
  steps: number[]
  synthEngine: SynthEngine;
  octave: number;
  channel: number;
  clock: number
}

export interface MidiNoteAndVelocity{
  note: number;
  velocity: number;
}

export class GitCalendarTrack extends React.Component<GitCalendarTrackProps, GitCalendarTrackState>{
  static contextType = ctx;
  constructor(props: GitCalendarTrackProps){
    super(props)
    this.state = {
      // limitedSteps: 1,
      steps: [0,16],
      synthEngine: new SynthEngine(this),
      octave: 3,
      channel: 0,
      clock: 0
    }
  }

  onRangeSliderChange = (value: number[]) => {
    this.setState({ steps: value })
  }

  // limitedSteps = (value: number[], tick: number) => {
  //   let distant = value[1] - value[0]
  //   let limited = distant > 16? 16:1
  //   console.log("distant", distant)
  //   console.log("tick", tick)
  //   this.setState({ limitedSteps: limited})
  // }

  setOctave = (type: string) => {
    if( type == 'up'){
      this.setState({ octave: this.state.octave + 1 })
    } else {
      this.setState({ octave: this.state.octave - 1  }) 
    }
  }

  setChannel = (type: string) => {
    if( type == 'up'){
      this.setState({ channel: this.state.channel + 1 })
    } else {
      this.setState({ channel: this.state.channel - 1  }) 
    }
  }

  /**
   * sending midi
   */
  runMidi = (midi: Midi, current: number): void => {
    const { extractedWeek, trackIndex } = this.props
    const { octave, channel } = this.state
    midi.clear()
    if(extractedWeek[current] !== null){
      this.getMidiNoteAndVelocity(extractedWeek[current]).forEach(m => {
        midi.send({
          channel ,
          octave, 
          note: getNote(m.note),
          velocity: Math.ceil( mapValue(m.velocity,1,10, 60,127 ) ), 
          length: 12 
        })
      })
      midi.run()
    }
  }

  /**
   * send trigger to Internal synth(default), currently chan 0 = polyphony synth.
   */
  runSynthEngine = (current: number) => {
    const { extractedWeek } = this.props
    const { synthEngine, channel, octave } = this.state
    let polyNotes: string[] = []
    let singleNote: string = 'C'
    if(extractedWeek[current] !== null){
      this.getMidiNoteAndVelocity(extractedWeek[current]).forEach(m => {
        singleNote = getNote(m.note, 'harmonic-minor')
        singleNote = singleNote + JSON.stringify(octave)
        polyNotes.push(singleNote)
      })
      this.runMonoSynth(synthEngine, channel, singleNote) 
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

  initChannel(){
    this.setState({ channel: this.props.trackIndex})
  }

  checkIsPlayingUnmuted = (): boolean => {
    return store.getState().session.isPlaying && !this.props.isAccountMuted
  }

  /**
   * clock per track, based on 16th notes global clock.
   */
  runClock = (tick: number): number => {
    const { steps } = this.state
    let distant = steps[1] - steps[0]
    // TODO: compensate overflow steps to wrap around new range properly.
    return tick % distant
  }

  run = (app: any, clock: number) => {
    const { steps } = this.state
    if(this.checkIsPlayingUnmuted() && store.getState().app.midiselect){
      this.runMidi( app.midi , getNewRange(clock,steps) ) 
    } 
    
    if (this.checkIsPlayingUnmuted() && !store.getState().app.midiselect){
      this.runSynthEngine(getNewRange(clock,steps)) 
    }
  }

  componentDidMount(){
    this.state.synthEngine.init()
    this.initChannel()
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
    const { steps, synthEngine, octave, channel, clock } = this.state

    let clockTrack = this.runClock(this.context.currentBeat)
    
    return ( 
      <AppContextConsumer>
        {appContext => appContext && (
          this.run(appContext, clockTrack),
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
              setOctave={this.setOctave}
              setChannel={this.setChannel}
              octave={octave}
              channel={channel}
              contributions={contributions}
            />
            <div className="track-steps">
              <RangeWithTooltips 
                max={53} min={0}
                defaultValue={[0, 16]} 
                step={8}
                allowCross={true}
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
                        clock={clockTrack}
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