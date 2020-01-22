import { store, actions } from 'store';
import * as Tone from "tone";

export interface EffectType{
  // bitcrusher: Tone.BitCrusher;
  // distortion: Tone.Distortion;
  // autowah: Tone.AutoWah;
  // feedback: Tone.FeedbackDelay;
  delay: Tone.PingPongDelay;
  // tremolo: Tone.Tremolo;
  reverb: Tone.JCReverb;
  // phaser: Tone.Phaser;
  // chorus: Tone.Chorus;
  // equalizer: Tone.EQ3;
  // compressor: Tone.Compressor;
  volume: Tone.Volume;
  limiter: Tone.Limiter;
}

export class SynthEngineState {
  index: number;
  channels: any[];
  effects: EffectType; 
  volume: number
}

export class SynthEngine extends SynthEngineState {
  
  constructor(props: any){
    super()
    this.index = 0
    this.channels = []
    this.volume = 1
    this.effects = {
      // bitcrusher: null,
      // distortion: null,
      // autowah: null,
      // feedback: null,
      delay: null,
      // tremolo: null,
      reverb: null,
      // phaser: null,
      // chorus: null,
      // equalizer: null,
      // compressor: null,
      volume: null,
      limiter: null,
    }
  }

  init = () => {
    this.defineSynth()
    this.defineEffect()
    this.connectNode()
  }

  defineSynth = () => {

    // AM
    this.channels[0] = new Tone.PolySynth(4, Tone.Synth);
    this.channels[1] = new Tone.AMSynth({ 'harmonicity': 1.75, 'oscillator': { 'type': 'sawtooth' }, 'modulation': { 'type': 'triangle' } })
    this.channels[2] = new Tone.FMSynth({ 'harmonicity': 1.75, 'modulationIndex': 10, 'oscillator': { 'type': 'sawtooth' }, 'modulation': { 'type': 'triangle' } })
    this.channels[3] =  new Tone.MembraneSynth({ 'octaves': 5, 'oscillator': { 'type': 'sine' } })
    }

    defineEffect(){
    // // I
    // this.effects.bitcrusher =  new Tone.BitCrusher(4)
    // this.effects.distortion =  new Tone.Distortion(0.05)
    // this.effects.autowah =  new Tone.AutoWah(100, 6, 0)
    // // II
    // this.effects.feedback =  new Tone.FeedbackDelay(0)
    // this.effects.delay =  new Tone.PingPongDelay('4n', 0.2)
    // this.effects.tremolo =  new Tone.Tremolo()
    this.effects.reverb =  new Tone.JCReverb(0)
    // // III
    // this.effects.phaser =  new Tone.Phaser(0.5, 3, 350)
    // this.effects.chorus =  new Tone.Chorus(4, 2.5, 0.5)
    // // Mastering
    // this.effects.equalizer =  new Tone.EQ3(5, 0, 5)
    // this.effects.compressor =  new Tone.Compressor(-6, 4)
    this.effects.volume =  new Tone.Volume(6)
    this.effects.limiter =  new Tone.Limiter(-2)    
  }

  connectNode = () => {

    for (const id in this.channels) {
      this.channels[id].connect(this.effects.reverb)
    }

    // this.effects.bitcrusher.connect(this.effects.distortion)
    // this.effects.distortion.connect(this.effects.autowah)
    // this.effects.autowah.connect(this.effects.feedback)

    // this.effects.feedback.connect(this.effects.delay)
    // this.effects.delay.connect(this.effects.reverb)
    // this.effects.tremolo.connect(this.effects.reverb)
    this.effects.reverb.connect(this.effects.volume)

    // this.effects.phaser.connect(this.effects.chorus)
    // this.effects.chorus.connect(this.effects.equalizer)

    // this.effects.equalizer.connect(this.effects.compressor)
    // this.effects.compressor.connect(this.effects.volume)
    this.effects.volume.connect(this.effects.limiter)
    this.effects.limiter.toMaster()
  }

  runPolySynth = (index: number, notes: string[]) => {
    this.channels[index].triggerAttackRelease(notes, "16n");
  }

  runMonoSynth = (index: number, note: string) => {
    this.channels[index].triggerAttackRelease(note, "16n");
  }

  setVolume = (newVolume: number) => {
    this.volume = Math.max(0, Math.min(1, newVolume));
    // this.effects.volume.volume = 
  }
}
