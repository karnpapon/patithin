import * as React from 'react'
import { Contribution } from 'services/fetchContributions'
import { getLevel } from 'utils'

import '../../index.css'

export interface DayRenderProps{
    day: Contribution
}
export interface DayRenderState{
  isMuted: Boolean,
}

export class DayRender extends React.Component<DayRenderProps, DayRenderState>{
  constructor(props: DayRenderProps){
    super(props)
    this.state = {
      isMuted: false,
    }
  }

  render(){
    const { day } = this.props
    return ( <div className={ `contribute-day ${getLevel(day.count)}` }></div> )
  }

}