declare module Gnccr {
  export type Params = {
    owner: string
    repo: string
    keywords: Array<string>
    sinceOffsetDaysBefore: number
    destination: Destination
    template: string | Array<string>
  }

  export type Destination = {
    type: string
    path?: string
    overwrite?: boolean
  }

  export type Review = {
    body: string
    diff_hunk: string
    html_url: string
    path: string
  }
}
