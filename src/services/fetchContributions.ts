import axios, { AxiosResponse } from "axios";

// import {Contribution} from '.'

export interface Contribution {
  date: Date;
  count: number;
}

export interface UserDetails {
  user_name: string;
  user_id: number;
  user_location: string;
  user_login: string;
}

const getContribution = (tile: Element): Contribution => {
  const _count = Number(tile.textContent.split(" ")[0]);
  return {
    date: new Date(String(tile.getAttribute("data-date"))),
    count: isNaN(_count) ? 0 : _count,
  };
};

const getUserIdDetails = (data: AxiosResponse<any>): UserDetails => ({
  user_name: data.data.name,
  user_id: data.data.id,
  user_location: data.data.location,
  user_login: data.data.login,
});

// flip array.
// quick workaround, since GitHub change rendering from week(vertical) to day(horizontal)
const flipArr = (contribs: Contribution[][]): Contribution[][] => {
  let contributionsByWeek: any = [];

  for (let i = 0; i <= contribs[0].length - 1; i++) {
    contributionsByWeek.push([]);
  }

  for (let i = 0; i <= contribs[0].length - 1; i++) {
    for (let j = 0; j <= contribs.length - 1; j++) {
      contribs[j][i] && contributionsByWeek[i].push(contribs[j][i]);
    }
  }

  return contributionsByWeek;
};

// const withCORS = (url: string) =>
//   'https://urlreq.appspot.com/req?method=GET&url=' + url

export async function fetchContributions(
  user: String
): Promise<Contribution[][]> {
  const endpoint = `https://patithin-server.vercel.app/api/contrib?user=${user}`;
  const { data: html } = await axios.get(endpoint);

  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");
  const rows = Array.from(
    dom.querySelectorAll(".js-calendar-graph-table tbody tr")
  );

  const contribs = [...rows].map((week) =>
    Array.from(week.querySelectorAll(".ContributionCalendar-day")).map(
      getContribution
    )
  );

  return flipArr(contribs);
}

export async function fetchUserDetails(user: String): Promise<UserDetails> {
  const endpoint = `https://api.github.com/users/${user}`;
  const data = await axios.get(endpoint);
  return getUserIdDetails(data);
}
