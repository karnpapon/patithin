import * as React from 'react'
import * as ReactDOM from 'react-dom'
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

  setLoadingOn(){
    store.dispatch(actions.setAppLoadingData(true))
  }

  setLoadingOff(){
    store.dispatch(actions.setAppLoadingData(false))
  }

  showLoading(){
    // ReactDOM.render(loadingPage, document.getElementById('ct'));
  }

  handleAddNewTrack = async () => {
    const calendar = new ContributionCalendar()
    this.setLoadingOn()
    calendar.loadContributions()
    .then(() => calendar.loadUserIdDetails())
    .then(() => this.setLoadingOff())
    .then(() => calendar.countContributions(calendar.contributionList()) )
    .then(() => store.dispatch( actions.setUserCollectionsData(calendar)) )
    .then(() => this.clearInput())
    .catch(() => { 
      this.setLoadingOff()
      alert("somethin' wrong... please try again") 
      return 
    })
  }

  componentDidMount(){
    this.inputRef.current.focus() 
  }

  render(){
    
    return (
      <div className="track-add">
        <div className="track-add-container">
          <div>ID:<input onChange={this.setUserIdInput} ref={this.inputRef}></input></div>
          <AddButton handleAddNewTrack={this.handleAddNewTrack.bind(this)}/>
        </div>
      </div>
    )
  }

}

export interface AddButtonProps {
  handleAddNewTrack: () => Promise<void>
}

class AddButton extends React.Component<AddButtonProps> {
  render() {
    const { handleAddNewTrack } = this.props
    return (
      <button className="add-track" onClick={handleAddNewTrack}>+</button>
    );
  }
}