import { store, actions } from 'store';

export class Sequencer {
  session: any;
  isPlaying: boolean;
  unsubscribe = store.subscribe(() => this.bump());
  nextKey: number;

  bump() {
    this.session = store.getState().session;
    if (this.isPlaying === this.session.isPlaying) {
      return;
    }
    this.isPlaying = this.session.isPlaying;
    if (this.isPlaying) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    if (this.nextKey) {
      return;
    }
    this.loop();
  }

  stop() {
    if (!this.nextKey) {
      return;
    }
    clearTimeout(this.nextKey);
    this.nextKey = null;
  }

  looped = this.loop.bind(this);
  loop() {
    const timeBeforeNext = 240000 / this.session.bpm / 16;
    this.nextKey = window.setTimeout(this.looped, timeBeforeNext);

    let index = (this.session.currentSeqPosition + 17) % 16;
    store.dispatch(actions.setCurrentSeqPosition(index));
  }

  destroy() {
    this.unsubscribe();
  }
}
