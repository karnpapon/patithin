export function range(steps: number[]) : number[]{
return Array(( steps[1] - 1 ) - steps[0] + 1).fill('').map((_: any, idx: number) => steps[0] + idx)
}

export function getNewRange(current: number, shift: number[]): number {
return current + shift[0]
}

export function mapValue(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function getNote( value: number, scale?: string[] ): string{
  let note: string
  note = scale[value]
  return note
}