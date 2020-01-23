import * as React from 'react'
import { GitCalendarTrack } from './track';
import { CalendarTrackAdd } from './track/track-add-new';
import { CalendarControl } from './control'
import { store, actions } from 'store'
import { ContributionCalendar } from 'models/ContributionCalendar';
import './index.css';

export interface PlaygroundProps{
}
export interface PlaygroundState {
  contributions: Array<ContributionCalendar>,
  isLoading: boolean,
  isUpdateAccountMute: boolean,
}

export class GitCalendarPlayground extends React.Component<PlaygroundProps, PlaygroundState>{
  constructor(props: PlaygroundProps){
    super(props)
    this.state = {
      contributions: [],
      isLoading: false,
      isUpdateAccountMute: false
    }

    store.subscribe(() => {
      let userData = store.getState().session.UserContributions;
      let isLoading = store.getState().app.loading;
      if (userData !== this.state.contributions || this.state.isUpdateAccountMute) {
        this.setState({ contributions: userData });
      }

      if (isLoading !== this.state.isLoading) {
        this.setState({ isLoading: isLoading });
      }
    });
  }

  updateAccountMute = () => {
    this.setState({ isUpdateAccountMute: !this.state.isUpdateAccountMute})
  }

  render(){
    const { contributions, isLoading } = this.state
    console.log("contri", contributions)
    return ( 
    <div className="contents"> 
      { isLoading? <LoadingDisplay/>:'' }
      {
        contributions.map((item, index) => 
          <GitCalendarTrack 
            key={index} 
            contributions={item.contributions} 
            totalCounts={item.totalCounts}
            UserDetails={item.userIdDetails}
            extractedWeek={item.extractedWeek}
            trackIndex={index}
            isAccountMuted={item.isAccountMuted}
            calendar={item}
            updateAccountMute={this.updateAccountMute}
          /> 
        )
      }
      <CalendarTrackAdd/>
      <CalendarControl/>
    </div>
    )
  }
}


class LoadingDisplay extends React.Component {
  render() {
    return (
      <div className="loading-track">
        {/* <img className="loading" src="src/assets/loading2.gif"></img> */}
        <p className="loading-texts">Getting Account Contributions...</p>
      </div>
    );
  }
}