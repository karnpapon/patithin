export interface CurrentSeqPositionAction {
  type: string;
  value: number;
}

export function currentSeqPosition (state:number = 0, action:CurrentSeqPositionAction):number {
  switch (action.type) {
    case 'SET_CURRECT_BIT':
      return action.value
    default:
      return state
  }
}