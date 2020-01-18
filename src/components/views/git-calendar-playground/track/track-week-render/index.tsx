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

  getNewRange = (current: number, shift: number[]): number => {
    return current + shift[0]
  }

  componentWillUnmount() {
    // this.unsubscribe();
    // this.isDead = true;
  }

  render(){
    const { weeks, week_idx, steps } = this.props

    let stepClass = ( current: number) => 
      ( this.state.isMuted? 'toggle':'' ) + 
      ( this.getNewRange(current, steps) == week_idx? 'active':'')

    let rangeClass = (steps: number[], week_idx: number) =>
      (week_idx == 0? 'first-col':'') + " " +
      (this.range(steps).indexOf(week_idx) == -1 ? 'excluded':"" )

    return (
      <AppContextConsumer>
        {appContext => appContext && (
          <div className={ `week ${stepClass(appContext.currentBeat)}` }>
           <span className="week-selector" onClick={() => this.toggleWeek(weeks)}>●</span>
           <div className={ `week-col ${rangeClass(steps, week_idx)}` }>{
             weeks.map((day, day_index) => <DayRender key={day_index} day={day}/>)}
           </div>
         </div>
        )}
      </AppContextConsumer>
    )
  }

}