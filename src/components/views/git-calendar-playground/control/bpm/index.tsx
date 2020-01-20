import * as React from 'react';
import { store, actions } from 'store';
import { Slider } from 'components/common/slider';

export interface BpmControlState {
  value: number;
}

export class BpmControl extends React.Component<any, BpmControlState> {
  updateListener = this.onUpdate.bind(this);
  unsubscribe = store.subscribe(() => {
    let newBpm = store.getState().session.bpm;
    if (newBpm !== this.state.value) {
      this.setState({
        value: newBpm
      });
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      value: store.getState().session.bpm
    };
  }

  onUpdate(change: number) {
    const value = this.state.value + change;
    store.dispatch(actions.setBpm(value));
  }

  render() {
    let prefixZero;
    if (this.state.value < 100) {
      prefixZero = <span className='bpm-control-off'>0</span>;
    }
    return (
      <Slider className='control-item' onUpdate={this.updateListener}>
        {prefixZero}
        <span className='control-item-content'>{this.state.value}</span>
        {/* <div className='bpm'>BPM</div> */}
      </Slider>
    );
  }
}
