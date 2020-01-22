import { store, actions } from 'store';


export class MidiState {
  index: number;
  devices: any[];
  stack: any[];
  app: any;
}

export class Midi extends MidiState {
  
  constructor(props: any){
    super()
    this.index = 0
    this.devices = []
    this.stack = []
    this.app = props
  }

  init = () => {
    console.info('Starting Midi..')
    this.setup()
  }

  destroy(){
    console.log("Closing Midi..")
    this.index = 0
    this.devices = []
    this.stack = []
    this.app = null 
  }

  clear = () => {
    this.stack = []
  }

  run = () => {
    for (const id in this.stack) {
      this.set(this.stack[id], this.device())
    }
  }

  // Midi

  send = ({ channel , octave, note, velocity, length }: any) => {
    let noteNumber = []
    let convertedNote 
    convertedNote = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'].indexOf( note )
    
    let msg = Object.assign({}, { channel, octave, note: convertedNote, velocity, length })
    this.stack.push(msg)
  }

  set = (data: any = this.stack, device: any) => {
    const channel = this.convertChannel(data['channel'])
    const note = this.convertNote(data['octave'], data['note'])
    const velocity = data['velocity'] > 127 || data['velocity'] < 0 ? 60: data['velocity'] // between 0 ~ 127
    const length = window.performance.now() + this.convertLength(data['length']) // 0 ~ 16

    if (!device) { console.warn('No midi device!'); return }
    device.send([channel[0], note, velocity]) 
    device.send([channel[1], note, velocity], length)
  }

  select = (id: number) => {
    if (!this.devices[id]) { return }
    this.index = id
    console.log(`Midi Device: ${this.device().name}`)
    return this.device()
  }

  device = () => {
    return this.devices[this.index]
  }

  list = () => {
    return this.devices
  }

  next = () => {
    this.select((this.index + 1) % this.devices.length)
  }

  // Setup

  setup = () => {
    if (!navigator.requestMIDIAccess) { return }
    navigator.requestMIDIAccess({ sysex: false }).then(this.access, (err) => {
      console.warn('No Midi', err)
    })
  }

  access = (midiAccess: any) => {
    const iter = midiAccess.outputs.values()
    for (let i = iter.next(); i && !i.done; i = iter.next()) {
      this.devices.push(i.value)
    }
    // this.select(0)
  }

  toString =  () => {
    return this.devices.length > 0 ? `${this.devices[this.index].name}` : 'No Midi'
  }

  convertChannel(id: number) {
    return [0x90 + id, 0x80 + id]
  }

  convertNote(octave: number, note: string) {
    return 24 + (octave * 12) + note // 60 = C3
  }

  convertLength(val: number, bpm?: number) {
    // [ 1 = (1/16) ] ~> 
    // [ 8 = (8/16) or half bar ] ~> 
    // [ 16 = (16/16) or full bar. ]
    // return (60000 / bpm) * (val / 16)
    if (!bpm) {
      bpm = 120
    }
    return (60000 / bpm) * (val / 16)
  }
}

