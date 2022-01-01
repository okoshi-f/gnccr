import { OctokitResponse } from "@octokit/types"
import { Serviceable } from "./Serviceable"
import { ReviewCommentsRepository } from "../repositories"

export class ReviewCommentsService
  implements Serviceable<Gnccr.Params, Promise<Array<Gnccr.Review>>>
{
  private reviewCommentsRepository = new ReviewCommentsRepository()

  public execute(params: Gnccr.Params): Promise<Array<Gnccr.Review>> {
    const goodFilter = (e: any) =>
      params.keywords.filter((item) => e.body?.indexOf(item) !== -1).length > 0
    return this.reviewCommentsRepository
      .findAll(params)
      .then((response: OctokitResponse<any>) =>
        response.data
          .filter(goodFilter)
          .map((review: any) => review as Gnccr.Review)
      )
  }
}
