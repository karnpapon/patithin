## Patithin (git-calendar-beat generator).

written in TypeScript + React + Redux

[TRY IT HERE 🕺🔥🔥](https://tender-banach-703feb.netlify.com/)

- internal synth (using [Tone.js](https://tonejs.github.io/))
    - channel 0 - 5 = AM Synthesis
    - channel 6 - 9 = FM Synthesis
    - channel 10 - 13 = Percussive
NOTE: Internal synth are all monophony.

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