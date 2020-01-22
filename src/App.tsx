import * as React from 'react';
import { Provider } from 'react-redux';
import { store, actions } from 'store';
import { GitCalendarPlayground } from 'components/views/git-calendar-playground';
import { Header } from './components/common/header'
import { Metronome } from 'models/Metronome';
import { Midi } from 'models/Midi';
import { AppContextInterface, AppContextProvider } from './AppContext';
import { SynthEngine } from 'models/Synth'

// declare var Gibberish: any;

interface AppState {
  metronome: Metronome,
  currentBeat: number,
  midi: Midi,
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      metronome: new Metronome(this),
      currentBeat: 0,
      midi: new Midi(this),
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

    const appCtx: AppContextInterface = {
      currentBeat: this.state.currentBeat,
      metronome: this.state.metronome,
      midi: this.state.midi,
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
