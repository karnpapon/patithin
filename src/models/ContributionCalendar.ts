import { Contribution, UserDetails, fetchContributions, fetchUserDetails } from 'services/fetchContributions'
import { store, actions } from 'store'
import {Nullable} from 'components/common/types'
import {flatten} from 'ramda'

export class ContributionCalendar {
  contributions: Contribution[][] = []
  isContributionLoaded: Boolean = false
  isUserIdDetailsLoaded: Boolean = false
  totalCounts: number
  userIdDetails: UserDetails

  async fetchContributions(user: string): Promise<Contribution[][]>{
    this.contributions = await fetchContributions(user)
    return this.contributions
  }

  async fetchUserIdDetails(user: string): Promise<UserDetails>{
    this.userIdDetails = await fetchUserDetails(user)
    return this.userIdDetails
  }

  contributionList(): Nullable<Contribution[]> {
    if (this.contributions.length === 0) return null
    return flatten(this.contributions)
  }

  countContributions(contributions: Contribution[]) {
    return this.totalCounts = contributions.map(c => c.count).reduce((a, b) => a + b, 0)
  }

  loadContributions(){
    const user = store.getState().session.setUserId
    return this.fetchContributions(user).then(
      () => {
        this.isContributionLoaded = true;
        return this;
      }
    ).catch( e =>  {
      this.isContributionLoaded = false;
      return this;
      }
    );
  }

  loadUserIdDetails(){
    const user = store.getState().session.setUserId
    return this.fetchUserIdDetails(user).then(
      () => {
        this.isUserIdDetailsLoaded = true;
        return this;
      }
    ).catch( e =>  {
      this.isUserIdDetailsLoaded = false;
      return this;
      }
    );
    
  }

}