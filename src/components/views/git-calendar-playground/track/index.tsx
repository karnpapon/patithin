import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { WeekRender } from './track-week-render';
import { CalendarTrackInfo } from './track-info'
import { createSliderWithTooltip, Range } from 'rc-slider';
import { getNewRange, mapValue, getNote,getNotesFromRoot,getDegreeInScale,getNotesFromScale,scaleLists } from 'utils'
import { AppContextConsumer, ctx} from 'AppContext';
import { ContributionCalendar } from 'models/ContributionCalendar'
import { Midi } from 'models/Midi'

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../index.css'
import { store } from 'store';
import { SynthEngine } from 'models/Synth';

const RangeWithTooltips = createSliderWithTooltip(Range);
const notes: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

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
  octave: number;
  channel: number;
  clock: number;
  rootNote: string;
  scale: string;
  notesInScale: string[],
  toggleMutedWeek: number[]
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
      steps: [0,16],
      synthEngine: new SynthEngine(this),
      octave: 3,
      channel: 0,
      clock: 0,
      rootNote: 'C',
      scale: 'major',
      notesInScale: [],
      toggleMutedWeek: []
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
    const { extractedWeek } = this.props
    const { octave, channel, notesInScale, toggleMutedWeek } = this.state
    midi.clear()
    if(extractedWeek[current] !== null){
      this.getMidiNoteAndVelocity(extractedWeek[current]).forEach(m => {
        midi.send({
          channel ,
          octave, 
          note: getNote(m.note, notesInScale),
          velocity: Math.ceil( mapValue(m.velocity,1,10, 60,127 ) ), 
          length: 16 
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
    const { synthEngine, channel, octave, notesInScale, toggleMutedWeek } = this.state
    let polyNotes: string[] = []
    let singleNote: string = 'C'

    if(extractedWeek[current] !== null){
      this.getMidiNoteAndVelocity(extractedWeek[current]).forEach(m => {
        singleNote = getNote(m.note, notesInScale)
        singleNote = singleNote + JSON.stringify(octave)
        polyNotes.push(singleNote)
      })

      if(channel == 0){
        this.runPolySynth(synthEngine, channel, polyNotes)
      } else{
        this.runMonoSynth(synthEngine, channel, singleNote) 
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

  initChannel(){
    this.setState({ channel: this.props.trackIndex})
  }

  checkIsPlayingUnmuted = (): boolean => {
    return store.getState().session.isPlaying && !this.props.isAccountMuted
  }

  /**
   * clock per track
   */
  runClock = (tick: number): number => {
    const { steps } = this.state
    let distant = steps[1] - steps[0]
    return tick % distant
  }

  run = (app: any, clock: number) => {
    const { steps, toggleMutedWeek } = this.state
    let refreshStep = getNewRange(clock,steps)
    if( toggleMutedWeek.indexOf(refreshStep) === -1){
      if(this.checkIsPlayingUnmuted() && store.getState().app.midiselect){
        this.runMidi( app.midi , refreshStep ) 
      } 
      
      if (this.checkIsPlayingUnmuted() && !store.getState().app.midiselect){
        this.runSynthEngine(refreshStep) 
      }
    }
  }

  getScale(index: number){
    let currentRootNoteIndex = notes.indexOf(this.state.rootNote)
    let scale = scaleLists
    let key = Object.keys(scale)
    let nextScale = key[Math.abs( index )]
    let notesInScale = getNotesFromScale(getNotesFromRoot(currentRootNoteIndex), getDegreeInScale(nextScale))
    this.setState({
      notesInScale: notesInScale,
      scale: nextScale
    })
  }

  transpose(index: number){
    let nextNote = notes[Math.abs( index )]
    let notesInScale = getNotesFromScale(getNotesFromRoot(index), getDegreeInScale(this.state.scale))
    this.setState({ 
      rootNote: nextNote,
      notesInScale: notesInScale
    })
  }

  handleStoreToggleMutedWeek = (week_index: number) => {
    let week = this.state.toggleMutedWeek
    // remove week index if contains one.
    if( week.indexOf(week_index) !== -1 ){
      week.splice(week.indexOf(week_index),1)
    } else {
      // otherwise add it to the list.
      week.push(week_index)
    }
    this.setState({ toggleMutedWeek: week })
  }

  initScale(){
    let notesInScale = getNotesFromScale(getNotesFromRoot(0), getDegreeInScale(this.state.scale))
    this.setState({ notesInScale: notesInScale})
  }

  componentDidMount(){
    this.state.synthEngine.init()
    this.initChannel()
    this.initScale()
  }


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
    const { steps, synthEngine, octave, channel, rootNote, scale, notesInScale } = this.state

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

            <NoteTransposer 
              transpose={this.transpose.bind(this)} 
              getScale={this.getScale.bind(this)} 
              rootNote={rootNote}
              scale={scale}
            />
            <div className="track-steps">
              <RangeWithTooltips 
                max={53} min={0}
                defaultValue={[0, 16]} 
                step={4}
                allowCross={true}
                tipFormatter={( value: number ) => `week ${value == 0? 1:value}`}
                tipProps={{ overlayClassName: 'tooltip-custom' }}
                pushable={true}
                onAfterChange={value => this.onRangeSliderChange( value )}
              />

              <div className="week-wrapper">
                <div className="note-display">
                  { notesInScale.map(( item, n_index ) => <span key={ n_index }>{item}</span>) }
                </div>
              
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
                          handleStoreToggleMutedWeek={this.handleStoreToggleMutedWeek}
                        />
                    })
                    :
                    "loading.."
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </AppContextConsumer>
     )
  }

}



export interface NoteTransposerProps{
  transpose: (index: number) => void;
  getScale: (index: number) => void;
  rootNote: string
  scale: string
}

export interface NoteTransposerState{
  currentNoteIndex: number;
  currentScaleIndex: number;
}

class NoteTransposer extends React.Component<NoteTransposerProps,NoteTransposerState>{
  constructor(props: NoteTransposerProps){
    super(props)
    this.state = {
      currentNoteIndex: 0,
      currentScaleIndex: 0
    }
  }


  handleTranspose = (direction: string): void => {
    let current = this.state.currentNoteIndex
    if(direction == 'up'){
      current = ( current + 1 ) % 11
    } else {
      if(current !== 0 ){
        current = ( current - 1 ) % 11
      }
    } 
    this.props.transpose( current )
    this.setState({ currentNoteIndex: current})
  }

  handleGetNewScale = () => {
    let current = this.state.currentScaleIndex
    current = ( current + 1 ) % Object.keys(scaleLists).length
    this.props.getScale(current)
    this.setState({ currentScaleIndex: current })
  }


  render(){
    const { rootNote, scale } = this.props
    return(
      <div className="day-selector">
        <div className="day-selector-wrapper">
          <span onClick={() => this.handleTranspose('up')} className="transpose-up">￪</span>
          <div className="root-note">{rootNote}</div>
          <span onClick={() => this.handleGetNewScale()} className="scale-title">{scale.substring(0,5)}</span>
          <span onClick={() => this.handleTranspose('down')} className="transpose-down">￬</span>
        </div>
    </div>
    )
  }
}