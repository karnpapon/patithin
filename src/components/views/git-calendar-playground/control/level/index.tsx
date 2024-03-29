import * as React from 'react';
import { Slider } from 'components/common/slider';
import { mapValue } from 'utils'
import './index.css';

export interface LevelMeterProps {
  progress: number;
  onUpdate?: (newIndex: number) => void;
  unitType?: string
  min?: number
  max?: number
  disabled: boolean
}

export interface LevelMeterState {
  progress: number;
}

export class LevelMeter extends React.Component< LevelMeterProps, LevelMeterState > {
  updateListener = this.onUpdate.bind(this);
  onUpdate(change: number) {
    let x = this.props.progress + change * (1 / 32);
    this.props.onUpdate(x);
  }

  constructor(props: LevelMeterProps) {
    super(props);
    this.state = {
      progress: props.progress
    };
  }

  render() {
    const { unitType, disabled } = this.props
    let height = Math.round((this.props.progress || 0) * 100) + '%';
    let displayValue = this.props.progress.toFixed(2).substr(2);
    let prefix;
    if (this.props.progress === 1) {
      displayValue = '100';
    } else {
      prefix = <span className='level-label-off'>0</span>;
    }

    return (
      <Slider
        className='level'
        unitSize={2}
        onUpdate={disabled? ()=>{}:this.updateListener}
      >
        <div className='level-wrap'>
          <div
            className={'level-content'}
            style={{ height: height }}
          />
        </div>
        {
          disabled?
            <span className='level-label'>
              <span> Disabled </span>
            </span>
            :
            <span className='level-label'>
              {/* {prefix} */}
              {/* <span>{displayValue}</span> */}
              {/* <p>{unitType}</p> */}
          </span>
        }
      </Slider>
    );
  }
}
