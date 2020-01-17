import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import { Sequencer } from 'models/Sequencer';
import { Metronome } from 'models/Metronome';

import './index.css';

// new Sequencer();
// var metronome = new Metronome()
// metronome.init()

ReactDOM.render(<App />, document.getElementById('root'));
