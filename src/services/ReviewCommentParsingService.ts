import { ReviewTemplateService } from "./ReviewTemplateService"
import { Serviceable } from "./Serviceable"

export class ReviewCommentParsingService implements Serviceable<any, string> {
  private templateService = new ReviewTemplateService()

  public execute(data: any): string {
    return this.templateService.execute(data)
  }
}
