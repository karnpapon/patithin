export interface MidiSelectAction {
    type: string;
    // isMidiModeOn: boolean;
}
  
export function midiselect(state: boolean = false, action: MidiSelectAction):  boolean {
  switch (action.type) {
    case 'TOGGLE_MIDI_SELECTION':
    return !state;
    default:
    return state;
  }
}
  