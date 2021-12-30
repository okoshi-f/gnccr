import { ParametersService } from "../services/ParametersService"
import { IssuesService } from "../services/IssuesService"
import { IssueParserService } from "../services/IssueParserService"
import { TextFileWriterService } from "../services/TextFileWriterService"

export class MainController {
  private constructor(params: Gnccr.Params) {
    this.params = params
    this.writerService = new TextFileWriterService(this.params.destination)
    this.parserService = new IssueParserService(this.writerService)
    this.issuesService = new IssuesService(this.parserService)
  }

  private params: Gnccr.Params
  private writerService: TextFileWriterService
  private parserService: IssueParserService
  private issuesService: IssuesService

  public doExecute(): Promise<number | void> {
    return this.issuesService.execute(this.params)
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
