import * as React from 'react';
import { Provider } from 'react-redux';
import { store, actions } from 'store';
import { GitCalendarPlayground } from 'components/views/git-calendar-playground';
import { Header } from './components/common/header'
import { Metronome } from 'models/Metronome';

interface AppState {
  // metronome: Metronome
}

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      // metronome: new Metronome()
    };
  }
  componentWillMount(){
    store.dispatch(actions.setAppMetronomeData(new Metronome))
  }
  componentDidMount() {
    store.getState().app.metronome.init()
  }
  componentWillUnmount() {
    
  }
  render() {
    return (
      <Provider store={store}>
        <Header/>
        <GitCalendarPlayground />
      </Provider>
    );
  }
}
