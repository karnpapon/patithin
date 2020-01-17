export interface AppControlAction {
    type: string;
    state: boolean;
  }
  
export function loading(state: boolean = false, action: AppControlAction): boolean {
  switch (action.type) {
    case 'SET_APP_LOADING_DATA':
    return action.state;
    default:
    return state;
  }
}
  