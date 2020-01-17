export interface setUserIdAction {
    type: string;
    value: string;
  }
  
  export function setUserId(state: string = "", action: setUserIdAction): string {
    switch (action.type) {
      case 'SET_USER_ID_INPUT':
        return action.value;
      default:
        return state;
    }
  }
  