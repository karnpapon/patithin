import * as React from 'react'
import { Contribution } from 'services/fetchContributions'
import { store, actions } from 'store'
import { ContributionCalendar } from 'models/ContributionCalendar'
import '../../index.css'

export interface CalendarTrackAddProps{ }
export interface CalendarTrackAddState{
  contributions: Contribution[][],
}

export class CalendarTrackAdd extends React.Component<CalendarTrackAddProps, CalendarTrackAddState>{
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: CalendarTrackAddProps){
    super(props)
    this.state = {
      contributions: [],
    }
  }

  setUserIdInput(event: React.ChangeEvent<HTMLInputElement> ){
    store.dispatch(actions.setUserIdInput(event.target.value))
  }

  clearInput(){
    this.inputRef.current.value = ""
    this.inputRef.current.focus()
  }

  handleAddNewTrack = async () => {
    const calendar = new ContributionCalendar()
    calendar.loadContributions()
    .then(() => calendar.loadUserIdDetails())
    .then(() => calendar.countContributions(calendar.contributionList()) )
    .then(() => store.dispatch( actions.setUserCollectionsData(calendar)) )
    .then(() => this.clearInput())
  }

  render(){
    
    return (
      <div className="track-add">
        <div className="track-add-container">
          <div>ID:<input onChange={this.setUserIdInput} ref={this.inputRef}></input></div>
          <button className="add-track" onClick={this.handleAddNewTrack}>+</button>
        </div>
      </div>
    )
  }

}