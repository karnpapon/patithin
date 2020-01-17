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
  isLoading: boolean
}

export class GitCalendarPlayground extends React.Component<PlaygroundProps, PlaygroundState>{
  constructor(props: PlaygroundProps){
    super(props)
    this.state = {
      contributions: [],
      isLoading: false
    }

    store.subscribe(() => {
      let userData = store.getState().session.UserContributions;
      let isLoading = store.getState().app.loading;
      if (userData !== this.state.contributions) {
        this.setState({
          contributions: userData
        });
      }

      if (isLoading !== this.state.isLoading) {
        this.setState({
          isLoading: isLoading
        });
      }
    });
  }

  render(){
    const { contributions, isLoading } = this.state
    return ( 
    <div className="contents"> 
      { isLoading? <LoadingButton/>:'' }
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


class LoadingButton extends React.Component {
  render() {
    return (
      <div className="loading-track">
        <img className="loading" src="src/assets/loading2.gif"></img>
      </div>
    );
  }
}