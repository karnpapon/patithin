export function range(steps: number[]) : number[]{
return Array(( steps[1] - 1 ) - steps[0] + 1).fill('').map((_: any, idx: number) => steps[0] + idx)
}

export function getNewRange(current: number, shift: number[]): number {
return current + shift[0]
}