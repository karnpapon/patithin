import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { GitCalendarPlayground } from 'components/views/git-calendar-playground';
import { Header } from './components/common/header'

interface AppState {
  
}

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      
    };
  }
  componentDidMount() {
    
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
