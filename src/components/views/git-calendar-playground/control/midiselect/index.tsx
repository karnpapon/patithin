import * as React from 'react';
import { store, actions } from 'store';
import { Slider } from 'components/common/slider';
import { AppContextConsumer } from 'AppContext';
import { Midi } from 'models/Midi';
import '../index.css'

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

  handleMidiSelection = () =>  {
    store.dispatch(actions.toggleMidiSelection())
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
          console.log("appcontext.mdi", appContext.midi),
          <div className="midi">
          { 
            isMidiOn? 
              <div className="midi-list">
                <div className={ `select ${isMidiListExpanded? 'select-active':''}` } onClick={this.showMidiList}>
                  <div className="select-styled"> { selectedMidi }</div>
                  <ul className="select-options">
                    <li value="hide">-- MIDI DEVICES --</li>
                    {
                      
                      appContext.midi.devices.length > 0? 
                      appContext.midi.list().map((item, index) => 
                        <li 
                          key={index} 
                          value={index} 
                          onClick={(e) => this.selectMidi(e, item.name, appContext.midi)}>
                            {item.name}
                        </li>
                      ):
                      <li value={0}> No MIDI Devices detected.</li>
                    }
                  </ul>
                </div>
              </div>
            : ''
          }
          <div className={ `midi-select ${isMidiOn? 'midi-active':''}` }>
            <i className="icon-midi" onClick={this.handleMidiSelection}></i> 
          </div>
        </div>
        )}
      </AppContextConsumer>
    );
  }
}
