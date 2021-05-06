## Patithin (git-calendar-beat generator).

[![Netlify Status](https://api.netlify.com/api/v1/badges/a04f2009-6f36-41e4-b907-b84dd383198b/deploy-status)](https://app.netlify.com/sites/tender-banach-703feb/deploys)

written in TypeScript + React + Redux

[TRY IT HERE 🕺🔥🔥](https://tender-banach-703feb.netlify.com/)

- internal synth (using [Tone.js](https://tonejs.github.io/))
    - channel 0 = PolySynth
    - channel 1 = sine-wave
    - channel 2 - 5 = AM Synthesis
    - channel 6 - 9 = FM Synthesis
    - channel 10 - 13 = Percussive


- MIDI protocol
- adjustable    
    - BPM 
    - MIDI CHAN
    - OCTAVE

<img src="public/img/ss3.png?sanitize=true">


### Development

- install `yarn install`
- build: `yarn build-dev`
- watch: `yarn watch`