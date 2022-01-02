import { Octokit } from "@octokit/rest"
import { OctokitResponse } from "@octokit/types"
import { subDays } from "date-fns"
import { Listable } from "./Listable"

export class ReviewCommentsRepository
  implements Listable<Gnccr.Params, Promise<OctokitResponse<any>>>
{
  private octokit: Octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  public findAll(params: Gnccr.Params): Promise<OctokitResponse<any>> {
    const since = subDays(new Date(), params.sinceOffsetDaysBefore)
    return this.octokit.pulls.listReviewCommentsForRepo({
      owner: params.owner,
      repo: params.repo,
      since: since.toISOString(),
    })
  }
}


