import * as React from 'react';
import { Provider } from 'react-redux';
import { store, actions } from 'store';
import { GitCalendarPlayground } from 'components/views/git-calendar-playground';
import { Header } from './components/common/header'
import { Metronome } from 'models/Metronome';
import { Midi } from 'models/Midi';
import { AppContextInterface, AppContextProvider } from './AppContext';

interface AppState {
  metronome: Metronome,
  currentBeat: number,
  midi: Midi,
  isMidiOn: boolean 
}

export class App extends React.Component<any, AppState> {

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
      metronome: new Metronome(this),
      currentBeat: 0,
      midi: new Midi(this),
      isMidiOn: false
    };
  }
  componentWillMount(){
  }

  componentDidMount() {
    this.state.metronome.init()
  }

  componentWillUnmount() {
  }


  render() {
    
    if(this.state.isMidiOn){
      this.state.midi.init()
    } else {
      this.state.midi.destroy() 
    }

    const appCtx: AppContextInterface = {
      currentBeat: this.state.currentBeat,
      metronome: this.state.metronome,
      midi: this.state.midi
    };

    return (
      <Provider store={store}>
        <Header/>
        <AppContextProvider value={appCtx}>
          <GitCalendarPlayground/>
        </AppContextProvider>
      </Provider>
    );
  }
}
