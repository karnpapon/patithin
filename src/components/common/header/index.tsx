import * as React from 'react'
import './index.css'

export interface HeaderProps{
    
}
export interface HeaderState{
//   isMuted: Boolean,
    
}

export class Header extends React.Component<HeaderProps, HeaderState>{
  constructor(props: HeaderProps){
    super(props)
    this.state = {
    //   isMuted: false,
    }
  }

  render(){
    
    return (
      <div className="header-container">
        <div className="left-col">
          PATITHIN
          {/* <i className="icon-contributions"></i> */}
        </div>
        <div className="right-col"> calendrical sequencer based on Github's contribution history. </div>
      </div>
    )
  }

}