import {
  Contribution,
  UserDetails,
  fetchContributions,
  fetchUserDetails,
} from "services/fetchContributions";
import { store, actions } from "store";
import { Nullable } from "components/common/types";
import { flatten } from "ramda";

export class ContributionCalendar {
  contributions: Contribution[][] = [];
  isContributionLoaded: Boolean = false;
  isUserIdDetailsLoaded: Boolean = false;
  totalCounts: number;
  userIdDetails: UserDetails;
  isFullyLoaded: Boolean = false;
  extractedWeek: any[] = [];
  isAccountMuted: boolean = false;

  async fetchContributions(user: string): Promise<Contribution[][]> {
    this.contributions = await fetchContributions(user);
    return this.contributions;
  }

  async fetchUserIdDetails(user: string): Promise<UserDetails> {
    this.userIdDetails = await fetchUserDetails(user);
    return this.userIdDetails;
  }

  contributionList(): Nullable<Contribution[]> {
    if (this.contributions.length === 0) return null;
    return flatten(this.contributions);
  }

  countContributions(contributions: Contribution[]) {
    return (this.totalCounts = contributions
      .map((c) => c.count)
      .reduce((a, b) => a + b, 0));
  }

  loadContributions(user: string) {
    return this.fetchContributions(user)
      .then(() => {
        this.isContributionLoaded = true;
        return this;
      })
      .catch((e) => {
        this.isContributionLoaded = false;
        return this;
      });
  }

  loadUserIdDetails(user: string) {
    return this.fetchUserIdDetails(user)
      .then(() => {
        this.isUserIdDetailsLoaded = true;
        return this;
      })
      .catch((e) => {
        this.isUserIdDetailsLoaded = false;
        return this;
      });
  }

  setExtractedWeek() {
    this.contributions.map((week, index) => {
      this.extractedWeek.push(this.extracted(week, index));
    });
  }

  extracted(weeks: Contribution[], weeks_index: number): Nullable<number[]> {
    let extract: Nullable<number[]>;
    if (weeks.some((week) => week.count > 0)) {
      extract = weeks.map((week) => week.count);
    } else {
      extract = null;
    }
    return extract;
  }

  setIsAccountMuted = () => {
    this.isAccountMuted = !this.isAccountMuted;
    return this;
  };
}
