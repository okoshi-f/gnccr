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

  export type User = {
    login?: string
    avatar_url?: string
  }

  export type Review = {
    body?: string
    diff_hunk?: string
    html_url?: string
    path?: string
    user?: User
    pull_request_url?: string
    created_at?: string
    updated_at?: string
    author_association?: string
  }
}
