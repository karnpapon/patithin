import * as React from 'react';
import { store, actions } from 'store';
import { AppContextConsumer } from 'AppContext';
import { Midi } from 'models/Midi';
import './index.css'

export interface MidiSelectState {
  isMidiOn: boolean,
  isMidiListExpanded: boolean,
  selectedMidi: string
}

export class MidiSelect extends React.Component<any, MidiSelectState> {

  unsubscribe = store.subscribe(() => {
    let midiState = store.getState().app.midiselect;
    if (midiState !== this.state.isMidiOn) {
      this.setState({
        isMidiOn: midiState
      });
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      isMidiOn: false,
      isMidiListExpanded: false,
      selectedMidi: '-- MIDI DEVICES --'
    };
  }

  toggleMidi = (midi: Midi) =>  {
    store.dispatch(actions.toggleMidiSelection())

    if( !this.state.isMidiOn){
      midi.init()
    } else{
      midi.destroy()
    }

    if(this.state.isMidiListExpanded){
      this.setState({ isMidiListExpanded: false})
    }
  }

  showMidiList = () => {
    this.setState({isMidiListExpanded: !this.state.isMidiListExpanded})
  }

  selectMidi = (event: React.MouseEvent, name: string, midi: Midi) => {
    midi.select(parseFloat( event.currentTarget.getAttribute('value')))
    this.setState({ selectedMidi: name})
  }

  render() {
    const { isMidiOn, isMidiListExpanded, selectedMidi } = this.state
    return (
      <AppContextConsumer>
        {appContext => appContext && (
          <div className="midi">
          { isMidiOn? 
            <MidiExpandTab 
              isMidiListExpanded={isMidiListExpanded}
              selectedMidi={selectedMidi}
              midi={appContext.midi} 
              selectMidi={this.selectMidi.bind(this)}
              showMidiList={this.showMidiList.bind(this)}/> 
            : 
            '' 
          }
          <div className={ `midi-select ${isMidiOn? 'midi-active':''}` }>
            <i className="icon-midi" onClick={() => { this.toggleMidi(appContext.midi) }}></i> 
          </div>
        </div>
        )}
      </AppContextConsumer>
    );
  }
}


export interface MidiExpandTabProps{
  isMidiListExpanded: boolean;
  selectedMidi: string;
  midi: Midi;
  showMidiList: () => {};
  selectMidi: (event: React.MouseEvent, name: string, midi: Midi) => {};
}
export interface MidiExpandTabState{}

class MidiExpandTab extends React.Component<MidiExpandTabProps,MidiExpandTabState>{

  render(){
    const { isMidiListExpanded, selectedMidi, midi, showMidiList, selectMidi } = this.props

    return(
      <div className="midi-list">
        <div className={ `select ${isMidiListExpanded? 'select-active':''}` } onClick={showMidiList}>
          <div className="select-styled"> { selectedMidi }</div>
          <ul className="select-options">
            <li value="hide">-- MIDI DEVICES --</li>
            {
              midi.devices.length > 0? 
              midi.list().map((item, index) => 
                <li 
                  key={index} 
                  value={index} 
                  onClick={(e) => selectMidi(e, item.name, midi)}>
                    {item.name}
                </li>
              ):
              <li value={0}> No MIDI Devices detected.</li>
            }
          </ul>
        </div>
      </div>
    )
  }
}