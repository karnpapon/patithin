import * as React from 'react'
import { Contribution } from 'services/fetchContributions'
import { DayRender } from '../track-day-render';
import { store } from 'store';
import { AppContextConsumer } from 'AppContext';
import '../../index.css';

export interface WeekRenderProps{
  weeks: Contribution[],
  week_idx?: number | null,
  steps: number[]
}
export interface WeekRenderState{
  isMuted: Boolean,
  currentPos: number;
}

export class WeekRender extends React.Component<WeekRenderProps, WeekRenderState>{

  // isDead = false;
  // unsubscribe = store.subscribe(() => {
  //   if (this.isDead) {
  //     return;
  //   }
  // });

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

  range = (steps: number[]) : number[] => {
    return Array(( steps[1] - 1 ) - steps[0] + 1).fill('').map((_: any, idx: number) => steps[0] + idx)
  }

  componentWillUnmount() {
    // this.unsubscribe();
    // this.isDead = true;
  }

  render(){
    const { weeks, week_idx, steps } = this.props
    return (
      <AppContextConsumer>
        {appContext => appContext && (
          <div className={ `week ${this.state.isMuted? 'toggle':''} ${( appContext.currentBeat + steps[0] ) == week_idx? 'active':''}` }>
           <span className="week-selector" onClick={() => this.toggleWeek(weeks)}>●</span>
           <div className={ `week-col ${this.range(steps).indexOf(week_idx) == -1 ? 'excluded':"" } ${week_idx == 0? 'first-col':''}` }>{
             weeks.map((day, day_index) => <DayRender key={day_index} day={day}/>)}
           </div>
         </div>
        )}
      </AppContextConsumer>
    )
  }

}