import {
  ParametersService,
  ReviewCommentsService,
  TextFileWriterService,
  TemplateService,
} from "../services"

export class MainController {
  private constructor(private params: Gnccr.Params) {
    this.writerService = new TextFileWriterService(this.params.destination)
    this.reviewCommentsService = new ReviewCommentsService()
    this.templateService = new TemplateService(
      this.asText(this.params.template)
    )
  }

  private writerService: TextFileWriterService
  private reviewCommentsService: ReviewCommentsService
  private templateService: TemplateService

  public doExecute(): Promise<number> {
    return this.reviewCommentsService.execute(this.params).then((reviews) => {
      const markdown = this.templateService.execute({ reviews: reviews })
      this.writerService.execute(markdown)
      return 0
    })
  }

  private asText(value: any): string {
    if (value instanceof Array) {
      return value.join("\n")
    }
    return value
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
