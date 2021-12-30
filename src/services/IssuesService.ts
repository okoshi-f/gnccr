import { OctokitResponse } from "@octokit/types"
import { Service } from "./Service"
import { OctokitRepository } from "../repositories/OctokitRepository"

export class IssuesService
  implements Service<Gnccr.Params, Promise<number | void>>
{
  constructor(parserService: Service<any, void>) {
    this.parserService = parserService
  }

  private parserService: Service<any, void>
  private octokitService = new OctokitRepository()

  public execute(params: Gnccr.Params): Promise<number | void> {
    const goodFilter = (e: any) =>
      params.keywords.filter((item) => e.body?.indexOf(item) !== -1).length > 0
    return this.octokitService
      .findAll(params)
      .then((response: OctokitResponse<any>) => {
        response.data
          .filter(goodFilter)
          .map((i: any) => this.parserService.execute(i))
      })
  }
}
