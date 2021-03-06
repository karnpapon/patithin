// -- 7 note scales
const major: number[] = [0,2,4,5,7,9,11]
const dorian: number[] = [0,2,3,5,7,9,10]
const phrygian: number[] = [0,1,3,5,7,8,10]
const lydian: number[] = [0,2,4,6,7,9,11]
const mixolydian: number[] = [0,2,4,5,7,9,10]
const minor: number[] = [0,2,3,5,7,8,10]
const locrian: number[] = [0,1,3,5,6,8,10]
const harmonicMinor: number[] = [0,2,3,5,7,8,11]
const harmonicMajor: number[] = [0,2,4,5,7,8,11]
const melodicMinor: number[] = [0,2,3,5,7,9,11]
const melodicMajor: number[] = [0,2,4,5,7,8,10]

// --
const superLocrian: number[] = [0,1,3,4,6,8,10]
const romanianMinor: number[] = [0,2,3,6,7,9,10]
const hungarianMinor: number[] = [0,2,3,6,7,8,11]
const neapolitanMinor: number[] = [0,1,3,5,7,8,11]
const enigmatic: number[] = [0,1,4,6,8,10,11]
const spanish: number[] = [0,1,4,5,7,8,10]

// -- modes of whole tones with added note ->
const leadingWhole: number[] = [0,2,4,6,8,10,11]
const lydianMinor: number[] = [0,2,4,6,7,8,10]
const neapolitanMajor: number[] = [0,1,3,5,7,9,11]
const locrianMajor: number[] = [0,2,4,5,6,8,10]

export const scaleLists: any = {
    major ,
    dorian ,
    phrygian ,
    lydian ,
    mixolydian ,
    minor ,
    locrian ,
    harmonicMinor ,
    harmonicMajor ,
    melodicMinor ,
    melodicMajor ,

    superLocrian ,
    romanianMinor ,
    hungarianMinor ,
    neapolitanMinor ,
    enigmatic ,
    spanish ,

    leadingWhole ,
    lydianMinor ,
    neapolitanMajor ,
    locrianMajor ,
}

let notes: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const getNotesFromRoot = function(index: number): string[] {
    let notesFromRoot: string[] = [], i: number
   for(i = index; i<notes.length + index; i++){
        notesFromRoot.push(notes[i % notes.length])
   }
   return notesFromRoot
}

export const getDegreeInScale = function(scale: string) : number[]{
    let degreeInScale: number[] = []
    degreeInScale = scaleLists[scale]
    return degreeInScale
}

export const getNotesFromScale = function(notesFromRoot: string[], degree: number[] ): string[] {
    let notes: string[] = []
    degree.forEach( deg => { notes.push(notesFromRoot[deg]) })
    return notes
}

export function getNote( value: number, scale?: string[] ): string{
    let note: string
    note = scale[value]
    return note
}