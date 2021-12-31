import { OctokitResponse } from "@octokit/types"
import { Serviceable } from "./Serviceable"
import { ReviewCommentsRepository } from "../repositories/ReviewCommentsRepository"

export class ReviewCommentsService
  implements Serviceable<Gnccr.Params, Promise<number | void>>
{
  constructor(private parserService: Serviceable<any, void>) {}

  private octokitService = new ReviewCommentsRepository()

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
