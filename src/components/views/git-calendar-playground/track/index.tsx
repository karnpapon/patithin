import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { WeekRender } from './track-week-render';
import { CalendarTrackInfo } from './track-info'
import { Metronome } from 'models/Metronome';
import '../index.css'

export interface GitCalendarTrackProps{
  contributions: Contribution[][],
  totalCounts: number,
  UserDetails: UserDetails,
  metronome: Metronome,
}
export interface GitCalendarTrackState{
  // isMuted: Boolean,
    
}

export class GitCalendarTrack extends React.Component<GitCalendarTrackProps, GitCalendarTrackState>{
  constructor(props: GitCalendarTrackProps){
    super(props)
    this.state = {
      // isMuted: false,
    }
  }

  render(){
      const { contributions, totalCounts, UserDetails } = this.props
    return ( 
        <div className="track-container">
          <CalendarTrackInfo totalCounts={totalCounts} UserDetails={UserDetails}/>
          <div className="track-steps">
            <div className="day-selector">
              <span>*</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
            </div>
            <div className="weeks-table">
              {
                contributions?
                contributions.map(( weeks, index ) => {
                    return <WeekRender 
                      key={index} 
                      weeks={weeks} 
                      week_idx={index} 
                      metronome={this.props.metronome}
                    />
                })
                :
                "loading.."
              }
            </div>
          </div>
        </div>
     )
  }

}