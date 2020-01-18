import * as React from 'react';
import { Provider } from 'react-redux';
import { store, actions } from 'store';
import { GitCalendarPlayground } from 'components/views/git-calendar-playground';
import { Header } from './components/common/header'
import { Metronome } from 'models/Metronome';
import { AppContextInterface, AppContextProvider } from './AppContext';

interface AppState {
  metronome: Metronome,
  currentBeat: number
}

// const CurrentBeatContext = React.createContext("current-beat-context!");

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      metronome: new Metronome(this),
      currentBeat: 0
    };
  }
  componentWillMount(){
    // store.dispatch(actions.setAppMetronomeData(new Metronome))
  }
  componentDidMount() {
    // store.getState().app.metronome.init()
    this.state.metronome.init()
  }
  componentWillUnmount() {
    
  }
  render() {

    const sampleAppContext: AppContextInterface = {
      currentBeat: this.state.currentBeat
    };

    console.log("state", this.state)
    return (
      <Provider store={store}>
        <Header/>
        <AppContextProvider value={sampleAppContext}>
          <GitCalendarPlayground  
            metronome={this.state.metronome}
            // currentBeat={this.state.currentBeat}
          />
        </AppContextProvider>
      </Provider>
    );
  }
}
