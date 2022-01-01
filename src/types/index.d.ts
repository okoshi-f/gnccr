declare module Gnccr {
  export type Params = {
    owner: string
    repo: string
    keywords: Array<string>
    since: string
    destination: string
    template: string
  }

  export type Review = {
    body: string
    diff_hunk: string
    html_url: string
    path: string
  }
}
