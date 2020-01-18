import * as React from 'react'
import { Contribution } from 'services/fetchContributions'
import { DayRender } from '../track-day-render';
import { store } from 'store';
import { Metronome } from 'models/Metronome';
import { AppContextConsumer } from 'AppContext';
import '../../index.css';

export interface WeekRenderProps{
  weeks: Contribution[],
  week_idx?: number | null,
  metronome: Metronome,
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
    return (
      <AppContextConsumer>
        {appContext => appContext && (
          <div className={ `week ${this.state.isMuted? 'toggle':''} ${appContext.currentBeat == week_idx? 'active':''}` }>
           <span className="week-selector" onClick={() => this.toggleWeek(weeks)}>●</span>
           <div className="week-col">{
             weeks.map((day, day_index) => <DayRender key={day_index} day={day}/>)}
           </div>
         </div>
        )}
      </AppContextConsumer>
    )
  }

}