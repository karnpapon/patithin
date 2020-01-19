import * as React from 'react'
import { Contribution, UserDetails } from 'services/fetchContributions'
import { WeekRender } from './track-week-render';
import { CalendarTrackInfo } from './track-info'
import { createSliderWithTooltip, Range } from 'rc-slider';
import {Nullable} from 'components/common/types'
// import Tooltip from 'rc-tooltip';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../index.css'

const RangeWithTooltips = createSliderWithTooltip(Range);

export interface GitCalendarTrackProps{
  contributions: Contribution[][],
  totalCounts: number,
  UserDetails: UserDetails,
}
export interface GitCalendarTrackState{
  steps: number[]
    
}

export class GitCalendarTrack extends React.Component<GitCalendarTrackProps, GitCalendarTrackState>{
  constructor(props: GitCalendarTrackProps){
    super(props)
    this.state = {
      steps: [0,16]
    }
  }

  onRangeSliderChange = (value: number[]) => {
    this.setState({ steps: value })
  }

  render(){

    const { contributions, totalCounts, UserDetails } = this.props
    const { steps } = this.state

    return ( 
        <div className="track-container">
          <CalendarTrackInfo totalCounts={totalCounts} UserDetails={UserDetails}/>
          <div className="track-steps">
            <RangeWithTooltips 
              max={53} min={0}
              defaultValue={[0, 16]} 
              step={16}
              allowCross={false}
              tipFormatter={( value: number ) => `week ${value == 0? 1:value}`}
              tipProps={{ overlayClassName: 'tooltip-custom' }}
              pushable={true}
              onAfterChange={value => this.onRangeSliderChange( value )}
            />
            {/* <div className="day-selector">
              <span>*</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span>+</span>
            </div> */}
            <div className="weeks-table">
              {
                contributions?
                contributions.map(( weeks, index ) => {
                    return <WeekRender 
                      key={index} 
                      weeks={weeks} 
                      week_idx={index} 
                      steps={steps}
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