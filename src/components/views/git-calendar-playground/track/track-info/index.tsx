import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { store, actions } from 'store'
import '../../index.css'

export interface CalendarTrackInfoProps{
  totalCounts: number,
  UserDetails: UserDetails,
  trackIndex: number
}
export interface CalendarTrackInfoState{
  // isMuted: Boolean,
}

export class CalendarTrackInfo extends React.Component<CalendarTrackInfoProps, CalendarTrackInfoState>{
  constructor(props: CalendarTrackInfoProps){
    super(props)
    this.state = {
      // isMuted: false,
    }
  }

  handleRemoveTrack(id: number){
    store.dispatch(actions.deleteUserCollectionData(id))
  }

  abbrevName(name: string): string{
    var n = name.split(' ');
    return n[0].charAt(0).toUpperCase()+ "." + n[1].charAt(0).toUpperCase() + "."
  }

  render(){

    const { totalCounts, UserDetails, trackIndex } = this.props
    
    return (
        <>
        <div className="track-title"> 
          <div className="delete-track" onClick={() => this.handleRemoveTrack(UserDetails.user_id)}>x</div>
        <p>{this.abbrevName(UserDetails.user_name)}</p>  
        </div>
        <div className="track-info">
          <p className="no-t-margin"> github/{UserDetails.user_login} </p>
          <div className="contrib-count">
            <div className="counts">
              <p>{totalCounts}</p>  
              <i className="icon-contributions"> </i> 
            </div>
            contributions
          </div>
          <div className="contrib-date">
            <p> from 01-07-2020 </p>
            <p> to 12-31-2020 </p>
            <p> midichan: {trackIndex} </p>
          </div>
        </div> 
        </>
    )
  }

}