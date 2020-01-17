import { Contribution } from 'services/fetchContributions'
import { ContributionCalendar } from 'models/ContributionCalendar';

export interface UserContributionsAction {
  type: string;
  data: ContributionCalendar;
  id: number;
}

  
export function UserContributions(state: Array<ContributionCalendar> = [], action: UserContributionsAction): Array<ContributionCalendar> {
  switch (action.type) {
    case 'SET_USER_COLLECTIONS_DATA':
      return [...state, action.data];
    case 'DELETE_USER_COLLECTIONS_DATA':
      state.splice(state.findIndex( obj => obj.userIdDetails.user_id == action.id), 1);
      return [...state];
    default:
      return state;
  }
}
  