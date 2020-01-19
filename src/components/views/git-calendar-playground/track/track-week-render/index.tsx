import * as React from 'react'
import { Contribution } from 'services/fetchContributions'
import { DayRender } from '../track-day-render';
import { store } from 'store';
import { AppContextConsumer } from 'AppContext';
import { range, getNewRange } from 'utils';
import '../../index.css';

export interface WeekRenderProps{
  weeks: Contribution[],
  week_idx?: number | null,
  steps: number[]
}
export interface WeekRenderState{
  isMuted: Boolean,
}

export class WeekRender extends React.Component<WeekRenderProps, WeekRenderState>{

  constructor(props: WeekRenderProps){
    super(props)
    this.state = {
      isMuted: false,
    }
  }

  toggleWeek(weeks: Contribution[]){
    this.setState({ isMuted: !this.state.isMuted})
  }

  componentWillUnmount() {
  }

  render(){
    const { weeks, week_idx, steps } = this.props

    let stepClass = ( current: number) => 
      ( this.state.isMuted? 'toggle':'' ) + 
      ( getNewRange(current, steps) == week_idx? 'active':'')

    let rangeClass = (steps: number[], week_idx: number) =>
      (week_idx == 0? 'first-col':'') + " " +
      (range(steps).indexOf(week_idx) == -1 ? 'excluded':"" )

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