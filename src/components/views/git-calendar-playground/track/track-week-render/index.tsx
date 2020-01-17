import * as React from 'react'
import { Contribution } from 'services/fetchContributions'
import { DayRender } from '../track-day-render';
import { store } from 'store';
import '../../index.css';

export interface WeekRenderProps{
  weeks: Contribution[],
  week_idx?: number | null
}
export interface WeekRenderState{
  isMuted: Boolean,
  currentPos: number;
}

export class WeekRender extends React.Component<WeekRenderProps, WeekRenderState>{

  isDead = false;
  unsubscribe = store.subscribe(() => {
    if (this.isDead) {
      return;
    }
    this.setState({
      currentPos: store.getState().session.currentSeqPosition
    });
  });

  constructor(props: WeekRenderProps){
    super(props)
    this.state = {
      isMuted: false,
      currentPos: 0
    }
  }

  toggleWeek(weeks: Contribution[]){
    this.setState({ isMuted: !this.state.isMuted})
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.isDead = true;
  }

  render(){
    const { weeks, week_idx } = this.props
    let { currentPos } = this.state;

    currentPos = store.getState().session.currentSeqPosition;

    return (
      <div className={ `week ${this.state.isMuted? 'toggle':''} ${week_idx == currentPos? 'active':''}` }>
        <span className="week-selector" onClick={() => this.toggleWeek(weeks)}>●</span>
        <div className="week-col">{
          weeks.map((day, day_index) => <DayRender key={day_index} day={day}/>)}
        </div>
      </div>
    )
  }

}