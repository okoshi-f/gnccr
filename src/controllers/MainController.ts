import {
  ParametersService,
  ParametersValidationService,
  ReviewCommentsService,
  TemplateService,
  DestinationDispatchService,
} from "../services"

export class MainController {
  private constructor(private params: Gnccr.Params) {
    this.destinationDispatchService = new DestinationDispatchService()
    this.reviewCommentsService = new ReviewCommentsService()
    this.templateService = new TemplateService(
      this.asText(this.params.template)
    )
  }

  private destinationDispatchService: DestinationDispatchService
  private reviewCommentsService: ReviewCommentsService
  private templateService: TemplateService

  public doExecute(): Promise<number> {
    return this.reviewCommentsService.execute(this.params).then((reviews) => {
      const markdown = this.templateService.execute({ reviews: reviews })
      const writerService = this.destinationDispatchService.execute(
        this.params.destination
      )
      writerService.execute(markdown)
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
    if (!params) {
      return Promise.reject(new Error("No parameters found"))
    }
    const parametersValidationService = new ParametersValidationService(params)
    const validated = parametersValidationService.execute()
    if (!validated.isValid()) {
      return Promise.reject(new Error(validated.getErrors().join("\n")))
    }

    const main = new MainController(params)
    return main.doExecute()
  }
}
