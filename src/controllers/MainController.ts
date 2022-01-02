import { DestinationDispatchService } from "services/DestinationDispatchService"
import {
  ParametersService,
  ReviewCommentsService,
  TemplateService,
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
    const writerService = this.destinationDispatchService.execute(
      this.params.destination
    )

    return this.reviewCommentsService.execute(this.params).then((reviews) => {
      const markdown = this.templateService.execute({ reviews: reviews })
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
    if (params === null) {
      return Promise.resolve(2)
    }

    const main = new MainController(params)
    return main.doExecute()
  }
}
