import axios, { AxiosResponse } from 'axios'

// import {Contribution} from '.'

export interface Contribution {
  date: Date
  count: number
}

export interface UserDetails {
  user_name: string,
  user_id: number,
  user_location: string,
  user_login: string
}

const getContribution = (tile: Element): Contribution => ({
  date: new Date(String(tile.getAttribute('data-date'))),
  count: Number(tile.getAttribute('data-count'))
})

const getUserIdDetails = (data: AxiosResponse<any>): UserDetails => ({
  user_name: data.data.name,
  user_id: data.data.id,
  user_location: data.data.location,
  user_login: data.data.login
})

const withCORS = (url: string) =>
  'https://urlreq.appspot.com/req?method=GET&url=' + url

export async function fetchContributions( user: String): Promise<Contribution[][]> {
  const endpoint = withCORS(`https://github.com/users/${user}/contributions`)
  const {data: html} = await axios.get(endpoint)

  const parser = new DOMParser()
  const dom = parser.parseFromString(html, 'text/html')
  const rows = Array.from(dom.querySelectorAll('.js-calendar-graph-svg g g'))

  return [...rows].map(week => Array.from(week.querySelectorAll('.day')).map(getContribution))
}


export async function fetchUserDetails(user: String): Promise<UserDetails> {
  const endpoint = `https://api.github.com/users/${user}`
  const data = await axios.get(endpoint)
  return getUserIdDetails(data)
}