import { Octokit } from "@octokit/rest"
import { OctokitResponse } from "@octokit/types"
import { Listable } from "repositories/Listable"

export class ReviewCommentsRepository
  implements Listable<Gnccr.Params, Promise<OctokitResponse<any>>>
{
  private octokit: Octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  public findAll(params: Gnccr.Params): Promise<OctokitResponse<any>> {
    return this.octokit.pulls.listReviewCommentsForRepo({
      owner: params.owner,
      repo: params.repo,
      since: params.since,
    })
  }
}
