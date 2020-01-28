import * as React from 'react';

import './index.css';

export interface SliderProps {
  unitSize?: number;
  reverseScroll?: boolean;
  className?: string;
  onUpdate: (change: number) => void;
}

export class Slider extends React.Component<SliderProps> {
  xStart: number;
  yStart: number;
  currentValue = 0;
  nextValue = 0;
  updatePlanned: number;

  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  el: HTMLDivElement;

  touchStartListener = this.touchStart.bind(this);
  touchUpdateListener = this.touchUpdate.bind(this);
  touchEndListener = this.touchEnd.bind(this);
  mouseStartListener = this.mouseStart.bind(this);
  mouseUpdateListener = this.mouseUpdate.bind(this);
  mouseEndListener = this.mouseEnd.bind(this);

  requestAnimationListener = this.requestAnimation.bind(this);

  componentWillUnmount() {
    if (this.updatePlanned) {
      window.cancelAnimationFrame(this.updatePlanned);
    }
    if (this.el) {
      this.el.onwheel = null;
    }
    this.mouseEnd(null);
  }

  componentDidMount() {
    // Keep the wrapper listening to the wheel event
    let el = this.elRef.current;
    if (this.el && this.el !== el) {
      this.el.onwheel = null;
    }
    this.el = el;
  }

  render() {
    let { className } = this.props;
    className = 'Slider ' + (className || '');
    return (
      <div
        onMouseDownCapture={this.mouseStartListener}
        onTouchStartCapture={this.touchStartListener}
        onTouchMoveCapture={this.touchUpdateListener}
        onTouchEndCapture={this.touchEndListener}
        className={className}
        ref={this.elRef}
      >
        {this.props.children}
      </div>
    );
  }


  touchStart(t: TouchEvent) {
    this.reset(t.targetTouches[0].pageX, t.targetTouches[0].pageY);
    this.touchUpdate(t);
  }

  touchUpdate(t: TouchEvent) {
    this.update(t.targetTouches[0].pageX, t.targetTouches[0].pageY);
  }

  touchEnd() {}


  mouseStart(t: MouseEvent) {
    this.reset(t.pageX, t.pageY);

    this.mouseUpdateListener = this.mouseUpdate.bind(this);
    this.mouseEndListener = this.mouseEnd.bind(this);
    window.addEventListener('mousemove', this.mouseUpdateListener);
    window.addEventListener('mouseleave', this.mouseEndListener);
    window.addEventListener('mouseup', this.mouseEndListener);
  }

  mouseUpdate(t: MouseEvent) {
    this.update(t.pageX, t.pageY);
  }

  mouseEnd(t: MouseEvent) {
    window.removeEventListener('mousemove', this.mouseUpdateListener);
    window.removeEventListener('mouseout', this.mouseEndListener);
    window.removeEventListener('mouseup', this.mouseEndListener);
  }


  reset(xStart: number, yStart: number) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.currentValue = 0;
    this.nextValue = 0;
  }

  update(x: number, y: number) {
    const unitSize = this.props.unitSize || 10;
    const raw = x - this.xStart + (this.yStart - y);
    const value = Math.round(raw / unitSize);
    this.setNextValue(value);
  }

  setNextValue(value: number) {
    if (this.nextValue === value) {
      return;
    }
    this.nextValue = value;
    this.triggerUpdate();
  }

  triggerUpdate() {
    if (this.updatePlanned) {
      return;
    }

    this.updatePlanned = window.requestAnimationFrame(
      this.requestAnimationListener
    );
  }

  requestAnimation() {
    this.updatePlanned = 0;
    this.props.onUpdate(this.nextValue - this.currentValue);
    this.currentValue = this.nextValue;
  }
}
