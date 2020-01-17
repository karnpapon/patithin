import { store, actions } from 'store';
import { MetronomeWorker } from './Metronomeworker'

export class Metronome {
   // implementation from https://github.com/cwilso/metronome.
   audioContext: AudioContext = null;
   unlocked: boolean = false;
   isPlaying: boolean = false;      // Are we currently playing?
   startTime: any;              // The start time of the entire sequence.
   current16thNote: any;        // What note is currently last scheduled?
   tempo: number = 120.0;          // tempo (in beats per minute)
   lookahead: number = 25.0;       // How frequently to call scheduling function 
                               //(in milliseconds)
   scheduleAheadTime: number = 0.1;    // How far ahead to schedule audio (sec)
                               // This is calculated from lookahead, and overlaps 
                               // with next interval (in case the timer is late)
   nextNoteTime: number = 0.0;     // when the next note is due.
   noteResolution: number = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
   noteLength: number = 0.05;      // length of "beep" (in seconds)
//    canvas                 // the canvas element
//    canvasContext;          // canvasContext is the canvas' context 2D
   last16thNoteDrawn = -1; // the last "box" we drew on the screen
   notesInQueue: any = [];      // the notes that have been put into the web audio,
                               // and may or may not have played yet. {note, time}
   timerWorker: MetronomeWorker = null;     // The Web Worker used to fire timer messages


   nextNote = function()  {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / 120;    // Notice this picks up the CURRENT 
                                        // tempo value to calculate beat length.
    this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
    this.current16thNote++;    // Advance the beat number, wrap to zero
    if (this.current16thNote == 16) {
      this.current16thNote = 0;
    }
  }

  scheduleNote = function( beatNumber: any, time: any ) {
    // push the note on the queue, even if we're not playing.
    // for displaying tick.
    this.notesInQueue.push( { note: beatNumber, time: time } );

    // create an oscillator
    var osc = this.audioContext.createOscillator();
    let gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    if (beatNumber % 16 === 0)    // beat 0 == high pitch
      osc.frequency.value = 880.0;
    else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
      osc.frequency.value = 440.0;
    else                        // other 16th notes = low pitch
      osc.frequency.value = 220.0;

    osc.start( time );
    osc.stop( time + this.noteLength );
  }

  scheduler = (): void => {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
      this.scheduleNote( this.current16thNote, this.nextNoteTime );
      this.nextNote();
    }
  }

  play = function(): void {
    this.session = store.getState().session;

    if (!this.unlocked) {
      // play silent buffer to unlock the audio
      var buffer = this.audioContext.createBuffer(1, 1, 22050);
      var node = this.audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      this.unlocked = true;
    }

    if (this.session.isPlaying) {
      console.log("playing.. sesion isPlaying")
      this.current16thNote = 0;
      this.nextNoteTime = this.audioContext.currentTime;
      window.parent.postMessage("start", '*')
    } else {
      window.parent.postMessage("stop", '*');
      return;
  }
  }

  draw = (): void => {
    var currentNote = this.last16thNoteDrawn;
    var currentTime = this.audioContext.currentTime;
    while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
      currentNote = this.notesInQueue[0].note;
      this.notesInQueue.splice(0,1);   // remove note from queue
    }

    if (this.last16thNoteDrawn != currentNote) {
      this.last16thNoteDrawn = currentNote;
    }

    window.requestAnimationFrame(this.draw);
  }

  init = (): void => {
    var self = this
    this.audioContext = new AudioContext(); 
    if(this.audioContext.state === 'suspended'){
      this.audioContext.resume(); 
    }

    console.log("init..")
    
    // start the drawing loop.
    window.requestAnimationFrame(this.draw);    

    this.timerWorker = new MetronomeWorker
    // this.timerWorker.render()

    onmessage = function(e) {
        if (e.data == "tick") {
          self.scheduler();
        } else { console.log("message: " + e.data)}
    }
    window.parent.postMessage({ "interval": this.lookahead }, '*')
  }

 
}
