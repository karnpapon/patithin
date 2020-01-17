import * as React from 'react'
import { Contribution, fetchContributions } from 'services/fetchContributions'
import { GitCalendarTrack } from './track';
import { CalendarTrackAdd } from './track/track-add-new';
import { CalendarControl } from './control'
import { store, actions } from 'store'
import { ContributionCalendar } from 'models/ContributionCalendar';
import './index.css';

export interface PlaygroundProps{}
export interface PlaygroundState {
  contributions: Array<ContributionCalendar>,
}

export class GitCalendarPlayground extends React.Component<PlaygroundProps, PlaygroundState>{
  constructor(props: PlaygroundProps){
    super(props)
    this.state = {
      contributions: [],
    }

    store.subscribe(() => {
      let userData = store.getState().session.UserContributions;
      if (userData !== this.state.contributions) {
        this.setState({
          contributions: userData
        });
      }
    });
  }

  render(){
    const { contributions } = this.state
    return ( 
    <div className="contents"> 
      {
        contributions.map((item, index) => 
          <GitCalendarTrack 
            key={index} 
            contributions={item.contributions} 
            totalCounts={item.totalCounts}
            UserDetails={item.userIdDetails}
          /> 
        )
      }
      <CalendarTrackAdd/>
      <CalendarControl/>
    </div>
    )
  }
}