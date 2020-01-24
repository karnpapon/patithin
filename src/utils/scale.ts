// // -- five notes scales
// minPent :: Num a => [a]
// minPent = [0,3,5,7,10]
// majPent :: Num a => [a]
// majPent = [0,2,4,7,9]

// // --  another mode of major pentatonic
// ritusen :: Num a => [a]
// ritusen = [0,2,5,7,9]

// // -- another mode of major pentatonic
// egyptian :: Num a => [a]
// egyptian = [0,2,5,7,10]

// // --
// kumai :: Num a => [a]
// kumai = [0,2,3,7,9]
// hirajoshi :: Num a => [a]
// hirajoshi = [0,2,3,7,8]
// iwato :: Num a => [a]
// iwato = [0,1,5,6,10]
// chinese :: Num a => [a]
// chinese = [0,4,6,7,11]
// indian :: Num a => [a]
// indian = [0,4,5,7,10]
// pelog :: Num a => [a]
// pelog = [0,1,3,7,8]

// // --
// prometheus :: Num a => [a]
// prometheus = [0,2,4,6,11]
// scriabin :: Num a => [a]
// scriabin = [0,1,4,7,9]

// // -- han chinese pentatonic scales
// gong :: Num a => [a]
// gong = [0,2,4,7,9]
// shang :: Num a => [a]
// shang = [0,2,5,7,10]
// jiao :: Num a => [a]
// jiao = [0,3,5,8,10]
// zhi :: Num a => [a]
// zhi = [0,2,5,7,9]
// yu :: Num a => [a]
// yu = [0,3,5,7,10]

// // -- 6 note scales
// whole :: Num a => [a]
// whole = [0,2,4,6,8,10]
// augmented :: Num a => [a]
// augmented = [0,3,4,7,8,11]
// augmented2 :: Num a => [a]
// augmented2 = [0,1,4,5,8,9]

// // -- hexatonic modes with no tritone
// hexMajor7 :: Num a => [a]
// hexMajor7 = [0,2,4,7,9,11]
// hexDorian :: Num a => [a]
// hexDorian = [0,2,3,5,7,10]
// hexPhrygian :: Num a => [a]
// hexPhrygian = [0,1,3,5,8,10]
// hexSus :: Num a => [a]
// hexSus = [0,2,5,7,9,10]
// hexMajor6 :: Num a => [a]
// hexMajor6 = [0,2,4,5,7,9]
// hexAeolian :: Num a => [a]
// hexAeolian = [0,3,5,7,8,10]

// -- 7 note scales
const major: number[] = [0,2,4,5,7,9,11]
const ionian : number[]= [0,2,4,5,7,9,11]
const dorian: number[] = [0,2,3,5,7,9,10]
const phrygian: number[] = [0,1,3,5,7,8,10]
const lydian: number[] = [0,2,4,6,7,9,11]
const mixolydian: number[] = [0,2,4,5,7,9,10]
const aeolian: number[] = [0,2,3,5,7,8,10]
const minor: number[] = [0,2,3,5,7,8,10]
const locrian: number[] = [0,1,3,5,6,8,10]
const harmonicMinor: number[] = [0,2,3,5,7,8,11]
const harmonicMajor: number[] = [0,2,4,5,7,8,11]
const melodicMinor: number[] = [0,2,3,5,7,9,11]
const melodicMinorDesc: number[] = [0,2,3,5,7,8,10]
const melodicMajor: number[] = [0,2,4,5,7,8,10]
const bartok: number[] = [0,2,4,5,7,8,10]
const hindu: number[] = [0,2,4,5,7,8,10]

// // -- raga modes
// todi :: Num a => [a]
// todi = [0,1,3,6,7,8,11]
// purvi :: Num a => [a]
// purvi = [0,1,4,6,7,8,11]
// marva :: Num a => [a]
// marva = [0,1,4,6,7,9,11]
// bhairav :: Num a => [a]
// bhairav = [0,1,4,5,7,8,11]
// ahirbhairav :: Num a => [a]
// ahirbhairav = [0,1,4,5,7,9,10]

// // --
// superLocrian :: Num a => [a]
// superLocrian = [0,1,3,4,6,8,10]
// romanianMinor :: Num a => [a]
// romanianMinor = [0,2,3,6,7,9,10]
// hungarianMinor :: Num a => [a]
// hungarianMinor = [0,2,3,6,7,8,11]
// neapolitanMinor :: Num a => [a]
// neapolitanMinor = [0,1,3,5,7,8,11]
// enigmatic :: Num a => [a]
// enigmatic = [0,1,4,6,8,10,11]
// spanish :: Num a => [a]
// spanish = [0,1,4,5,7,8,10]

// // -- modes of whole tones with added note ->
// leadingWhole :: Num a => [a]
// leadingWhole = [0,2,4,6,8,10,11]
// lydianMinor :: Num a => [a]
// lydianMinor = [0,2,4,6,7,8,10]
// neapolitanMajor :: Num a => [a]
// neapolitanMajor = [0,1,3,5,7,9,11]
// locrianMajor :: Num a => [a]
// locrianMajor = [0,2,4,5,6,8,10]

// // -- 8 note scales
// diminished :: Num a => [a]
// diminished = [0,1,3,4,6,7,9,10]
// diminished2 :: Num a => [a]
// diminished2 = [0,2,3,5,6,8,9,11]

// // -- 12 note scales
// chromatic :: Num a => [a]
// chromatic = [0,1,2,3,4,5,6,7,8,9,10,11]

export const scaleLists: any = {
    major ,
    ionian ,
    dorian ,
    phrygian ,
    lydian ,
    mixolydian ,
    aeolian ,
    minor ,
    locrian ,
    harmonicMinor ,
    harmonicMajor ,
    melodicMinor ,
    melodicMinorDesc ,
    melodicMajor ,
    bartok ,
    hindu ,
}

const notes: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export const getNotesFromRoot = function(index: number) {
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

