import { Octokit } from "@octokit/rest"
import { OctokitResponse } from "@octokit/types"
import { FindAllRepository } from "./FindAllRepository"

export class OctokitRepository implements FindAllRepository<Gnccr.Params, Promise<OctokitResponse<any>>> {
  private octokit: Octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  public findAll(params: Gnccr.Params): Promise<OctokitResponse<any>> {
    return this.octokit.issues.listForRepo({
      owner: params.owner,
      repo: params.repo,
      since: params.since
    })
  }
}
