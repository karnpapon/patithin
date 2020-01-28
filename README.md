## Patithin (git-calendar-beat generator).

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

<img src="public/img/ss.png?sanitize=true">


### Development

- install `yarn install`
- build: `yarn build-dev`
- watch: `yarn watch`