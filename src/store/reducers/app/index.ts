export interface AppStateAction {
    type: string;
    state: boolean;
  }
  
export function loading(state: boolean = false, action: AppStateAction): boolean {
  switch (action.type) {
    case 'SET_APP_LOADING_DATA':
    return action.state;
    default:
    return state;
  }
}
  