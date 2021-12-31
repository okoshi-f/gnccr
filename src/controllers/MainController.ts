import { ParametersService } from "../services/ParametersService"
import { ReviewCommentsService } from "../services/ReviewCommentsService"
import { ReviewCommentParsingService } from "../services/ReviewCommentParsingService"
import { TextFileWriterService } from "../services/TextFileWriterService"
import { ReviewsTemplateService } from "../services/ReviewsTemplateService"

export class MainController {
  private constructor(private params: Gnccr.Params) {
    this.writerService = new TextFileWriterService(this.params.destination)
    this.parsingService = new ReviewCommentParsingService()
    this.reviewCommentsService = new ReviewCommentsService(this.parsingService)
    this.templateService = new ReviewsTemplateService()
  }

  private writerService: TextFileWriterService
  private parsingService: ReviewCommentParsingService
  private reviewCommentsService: ReviewCommentsService
  private templateService: ReviewsTemplateService

  public doExecute(): Promise<number> {
    return this.reviewCommentsService.execute(this.params).then((reviews) => {
      const markdown = this.templateService.execute({ reviews: reviews })
      this.writerService.execute(markdown)
      return 0
    })
  }

  public static execute(): Promise<number | void> {
    const parametersService = new ParametersService()
    const params = parametersService.execute()
    if (params === null) {
      return Promise.resolve(2)
    }

    const main = new MainController(params)
    return main.doExecute()
  }
}
