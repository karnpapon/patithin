export function range(steps: number[]) : number[]{
return Array(( steps[1] - 1 ) - steps[0] + 1).fill('').map((_: any, idx: number) => steps[0] + idx)
}

export function getNewRange(current: number, shift: number[]): number {
return current + shift[0]
}

export function mapValue(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function getNote( value: number, scale?: string ): string{
  let note: string
  if ( scale == 'harmonic-minor' ){
    switch (value) {
      case 0:
        note = 'C'
        break;
      case 1:
        note = 'D'
        break;
      case 2:
        note = 'D#'
        break;
      case 3:
        note = 'F'
        break;
      case 4:
        note = 'G'
        break;
      case 5:
        note = 'G#'
        break;
      case 6:
        note = 'B'
        break;
      default:
        note = 'C'
        break;
    }
  } else {
    switch (value) {
      case 0:
        note = 'C'
        break;
      case 1:
        note = 'B'
        break;
      case 2:
        note = 'D'
        break;
      case 3:
        note = 'E'
        break;
      case 4:
        note = 'F'
        break;
      case 5:
        note = 'G'
        break;
      case 6:
        note = 'A'
        break;
      default:
        note = 'C'
        break;
    }
  }

  return note
}