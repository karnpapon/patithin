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

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      metronome: new Metronome(this),
      currentBeat: 0
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
      metronome: this.state.metronome
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
