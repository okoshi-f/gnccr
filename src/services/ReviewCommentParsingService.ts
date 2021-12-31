import { Serviceable } from "./Serviceable";

export class ReviewCommentParsingService implements Serviceable<any, void> {
  constructor(private writerService: Serviceable<string, void>) {}

  public execute(data: any): void {
    this.writerService.execute(data)
  }
}
