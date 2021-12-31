import { ParametersService } from "../services/ParametersService";
import { ReviewCommentsService } from "../services/ReviewCommentsService";
import { ReviewCommentParsingService } from "../services/ReviewCommentParsingService";
import { TextFileWriterService } from "../services/TextFileWriterService";

export class MainController {
  private constructor(private params: Gnccr.Params) {
    this.writerService = new TextFileWriterService(this.params.destination);
    this.parserService = new ReviewCommentParsingService(this.writerService);
    this.issuesService = new ReviewCommentsService(this.parserService);
  }

  private writerService: TextFileWriterService;
  private parserService: ReviewCommentParsingService;
  private issuesService: ReviewCommentsService;

  public doExecute(): Promise<number | void> {
    return this.issuesService.execute(this.params);
  }

  public static execute(): Promise<number | void> {
    const parametersService = new ParametersService();
    const params = parametersService.execute();
    if (params === null) {
      return Promise.resolve(2);
    }

    const main = new MainController(params);
    return main.doExecute();
  }
}
